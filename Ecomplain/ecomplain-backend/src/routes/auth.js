const express = require('express');
const router = express.Router();
const {
  registerStudent,
  sendRegistrationOTP,
  verifyOTPAndRegister,
  resendRegistrationOTP,
  loginStudent,
  loginAdmin,
  getMe,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const {
  validateStudentRegistration,
  validateStudentLogin,
  validateAdminLogin,
  validatePasswordReset,
  validateNewPassword
} = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

// Public routes
// OTP-based registration flow
router.post('/send-otp', validateStudentRegistration, sendRegistrationOTP);
router.post('/verify-otp', verifyOTPAndRegister);
router.post('/resend-otp', resendRegistrationOTP);
// Keep old register endpoint for backwards compatibility (redirects to OTP flow)
router.post('/register', validateStudentRegistration, sendRegistrationOTP);
router.post('/login', validateStudentLogin, loginStudent);
router.post('/admin/login', validateAdminLogin, loginAdmin);
router.post('/refresh', refreshToken);
router.post('/forgot-password', validatePasswordReset, forgotPassword);
router.put('/reset-password/:token', validateNewPassword, resetPassword);

// Debug endpoint to test registration data
router.post('/register-debug', (req, res) => {
  console.log('Registration Debug - Request Body:', JSON.stringify(req.body, null, 2));
  res.json({
    success: true,
    message: 'Debug data received',
    receivedData: req.body
  });
});

// Test registration endpoint without validation
router.post('/register-test', registerStudent);

// Protected routes
router.get('/me', authenticateToken, getMe);
router.post('/logout', authenticateToken, logout);

module.exports = router;
