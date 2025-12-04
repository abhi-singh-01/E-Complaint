const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const { asyncHandler } = require('../middleware/errorHandler');

// Generate JWT Token
const generateToken = (userId, userType) => {
  return jwt.sign(
    { userId, userType },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Generate Refresh Token
const generateRefreshToken = (userId, userType) => {
  return jwt.sign(
    { userId, userType, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d' }
  );
};

// @desc    Register a new student
// @route   POST /api/auth/register
// @access  Public
const registerStudent = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, libraryId, rollNo, department, year, password } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({
      $or: [{ email }, { libraryId }, { rollNo }]
    });

    if (existingStudent) {
      let message = 'Student already exists with ';
      if (existingStudent.email === email) message += 'this email';
      else if (existingStudent.libraryId === libraryId) message += 'this library ID';
      else if (existingStudent.rollNo === rollNo) message += 'this roll number';
      
      return res.status(400).json({
        success: false,
        message
      });
    }

    // Create student
    const student = await Student.create({
      firstName,
      lastName,
      email,
      libraryId,
      rollNo,
      department,
      year,
      password
    });

    // Generate tokens
    const token = generateToken(student._id, 'student');
    const refreshToken = generateRefreshToken(student._id, 'student');

    // Update last login
    student.lastLogin = new Date();
    await student.save();

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      token,
      refreshToken,
      redirectUrl: '/student-dashboard',
      student: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        libraryId: student.libraryId,
        rollNo: student.rollNo,
        department: student.department,
        year: student.year,
        fullName: student.fullName
      }
    });
  } catch (error) {
    console.error('\n❌ Registration error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Request body:', JSON.stringify(req.body, null, 2));
    console.error('Environment:', process.env.VERCEL ? 'Vercel' : process.env.NODE_ENV || 'Unknown');
    
    // Handle MongoDB connection errors
    if (error.name === 'MongoServerError' || error.name === 'MongoNetworkError' || error.name === 'MongoTimeoutError' || error.name === 'MongooseError') {
      console.error('💡 MongoDB connection issue detected');
      
      // Check if it's a network/connection issue
      if (error.message.includes('timeout') || 
          error.message.includes('ECONNREFUSED') || 
          error.message.includes('ENOTFOUND') ||
          error.message.includes('whitelist') ||
          error.message.includes('connection') ||
          error.message.includes('network')) {
        return res.status(503).json({
          success: false,
          message: 'Database connection error. Please check your MongoDB Atlas network settings and ensure IP whitelist includes 0.0.0.0/0 for Vercel deployments.',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }
      
      return res.status(503).json({
        success: false,
        message: 'Database connection error. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
    // Handle duplicate key errors (email, libraryId, rollNo already exists)
    if (error.name === 'MongoServerError' && error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      console.error(`💡 Duplicate ${field} detected`);
      return res.status(400).json({
        success: false,
        message: `Student already exists with this ${field === 'email' ? 'email' : field === 'libraryId' ? 'library ID' : 'roll number'}`
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message).join(', ');
      console.error('💡 Validation error:', messages);
      return res.status(400).json({
        success: false,
        message: messages || 'Validation error'
      });
    }
    
    // Handle other errors
    console.error('💡 Unknown error type, re-throwing to asyncHandler');
    // Re-throw to be handled by asyncHandler
    throw error;
  }
});

// @desc    Login student
// @route   POST /api/auth/login
// @access  Public
const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if student exists and include password for comparison
  const student = await Student.findOne({ email }).select('+password');

  if (!student) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // Check if account is locked
  if (student.isLocked) {
    return res.status(423).json({
      success: false,
      message: 'Account is temporarily locked due to multiple failed login attempts'
    });
  }

  // Check if account is active
  if (!student.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Account is deactivated'
    });
  }

  // Check password
  const isPasswordValid = await student.comparePassword(password);

  if (!isPasswordValid) {
    // Increment login attempts
    await student.incLoginAttempts();
    
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // Reset login attempts on successful login
  if (student.loginAttempts > 0) {
    await student.resetLoginAttempts();
  }

  // Update last login
  student.lastLogin = new Date();
  await student.save();

  // Generate tokens
  const token = generateToken(student._id, 'student');
  const refreshToken = generateRefreshToken(student._id, 'student');

  res.json({
    success: true,
    message: 'Login successful',
    token,
    refreshToken,
    redirectUrl: '/student-dashboard',
    student: {
      id: student._id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      libraryId: student.libraryId,
      rollNo: student.rollNo,
      department: student.department,
      year: student.year,
      fullName: student.fullName
    }
  });
});

// @desc    Login admin
// @route   POST /api/auth/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password, role, department } = req.body;

  console.log('Admin login attempt:', { email, role, department });

  // Check if admin exists and include password for comparison
  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin) {
    console.log('Admin not found for email:', email);
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  console.log('Admin found:', { 
    id: admin._id, 
    email: admin.email, 
    role: admin.role, 
    department: admin.department,
    isActive: admin.isActive,
    isLocked: admin.isLocked
  });

  // Check if account is locked
  if (admin.isLocked) {
    return res.status(423).json({
      success: false,
      message: 'Account is temporarily locked due to multiple failed login attempts'
    });
  }

  // Check if account is active
  if (!admin.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Account is deactivated'
    });
  }

  // Check role if specified
  if (role && admin.role !== role) {
    console.log('Role mismatch:', { expected: role, actual: admin.role });
    return res.status(401).json({
      success: false,
      message: 'Invalid role for this account'
    });
  }

  // Check department if specified (for non-super admin roles)
  if (department && admin.role !== 'super_admin' && admin.department !== department) {
    console.log('Department mismatch:', { expected: department, actual: admin.department });
    return res.status(401).json({
      success: false,
      message: 'Invalid department for this account'
    });
  }

  // Check password
  const isPasswordValid = await admin.comparePassword(password);

  if (!isPasswordValid) {
    console.log('Password validation failed for admin:', admin.email);
    // Increment login attempts
    await admin.incLoginAttempts();
    
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  console.log('Password validation successful for admin:', admin.email);

  // Reset login attempts on successful login
  if (admin.loginAttempts > 0) {
    await admin.resetLoginAttempts();
  }

  // Update last login
  admin.lastLogin = new Date();
  await admin.save();

  // Generate tokens
  const token = generateToken(admin._id, 'admin');
  const refreshToken = generateRefreshToken(admin._id, 'admin');

  res.json({
    success: true,
    message: 'Login successful',
    token,
    refreshToken,
    admin: {
      _id: admin._id,
      id: admin._id, // Keep both for compatibility
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      role: admin.role,
      displayRole: admin.displayRole,
      department: admin.department,
      permissions: admin.permissions,
      fullName: admin.fullName
    }
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = req.user;
  const userType = req.userType;

  res.json({
    success: true,
    userType,
    user
  });
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: 'Refresh token is required'
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (decoded.type !== 'refresh') {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // Check if user still exists
    let user;
    if (decoded.userType === 'student') {
      user = await Student.findById(decoded.userId);
    } else if (decoded.userType === 'admin') {
      user = await Admin.findById(decoded.userId);
    }

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive'
      });
    }

    // Generate new tokens
    const newToken = generateToken(user._id, decoded.userType);
    const newRefreshToken = generateRefreshToken(user._id, decoded.userType);

    res.json({
      success: true,
      token: newToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  // In a more sophisticated implementation, you might want to blacklist the token
  // For now, we'll just send a success response
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email, userType } = req.body;

  let user;
  if (userType === 'student') {
    user = await Student.findOne({ email });
  } else if (userType === 'admin') {
    user = await Admin.findOne({ email });
  } else {
    return res.status(400).json({
      success: false,
      message: 'User type must be specified (student or admin)'
    });
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found with this email address'
    });
  }

  // Generate reset token
  const resetToken = user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    // Create reset URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}?userType=${userType}`;

    // Send password reset email
    const { sendPasswordResetEmail } = require('../utils/emailService');
    await sendPasswordResetEmail({
      email: user.email,
      name: user.firstName || user.name || 'User',
      resetToken,
      resetUrl
    });

    res.json({
      success: true,
      message: 'Password reset link has been sent to your email. Please check your inbox.'
    });
  } catch (error) {
    // If email fails, still clear the reset token for security
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    console.error('Error sending password reset email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send password reset email. Please try again later.'
    });
  }
});

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password, userType } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Reset token is required'
    });
  }

  // Decode URL-encoded token if needed (handles URL encoding from email links)
  let decodedToken;
  try {
    decodedToken = decodeURIComponent(token);
  } catch (e) {
    // If decoding fails, use original token
    decodedToken = token;
  }

  // Hash the token to compare with stored hash
  const hashedToken = crypto.createHash('sha256').update(decodedToken).digest('hex');

  let user;
  if (userType === 'student') {
    user = await Student.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
  } else if (userType === 'admin') {
    user = await Admin.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: 'User type must be specified (student or admin)'
    });
  }

  if (!user) {
    // Check if token exists but expired
    const expiredUser = userType === 'student' 
      ? await Student.findOne({ passwordResetToken: hashedToken })
      : await Admin.findOne({ passwordResetToken: hashedToken });
    
    if (expiredUser) {
      const now = Date.now();
      const expires = expiredUser.passwordResetExpires?.getTime() || 0;
      if (expires <= now) {
        return res.status(400).json({
          success: false,
          message: 'Reset token has expired. Please request a new password reset link. Tokens expire after 10 minutes.'
        });
      }
    }
    
    return res.status(400).json({
      success: false,
      message: 'Invalid reset token. Please use the link from your email or request a new one.'
    });
  }

  // Set new password
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Generate new token
  const newToken = generateToken(user._id, userType);

  res.json({
    success: true,
    message: 'Password reset successful',
    token: newToken
  });
});

module.exports = {
  registerStudent,
  loginStudent,
  loginAdmin,
  getMe,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword
};
