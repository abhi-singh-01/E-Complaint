const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  // Use environment variables for email configuration
  // For Gmail, you can use an App Password instead of your regular password
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD || process.env.EMAIL_PASSWORD, // Use App Password for Gmail
    },
  });

  return transporter;
};

/**
 * Send password reset email
 * @param {Object} options - Email options
 * @param {String} options.email - Recipient email
 * @param {String} options.name - Recipient name
 * @param {String} options.resetToken - Password reset token
 * @param {String} options.resetUrl - Full reset URL
 */
const sendPasswordResetEmail = async ({ email, name, resetToken, resetUrl }) => {
  try {
    // If no email configuration, log the reset link (for development)
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('\n=== PASSWORD RESET EMAIL (Development Mode) ===');
      console.log(`To: ${email}`);
      console.log(`Reset URL: ${resetUrl}`);
      console.log(`Token: ${resetToken}`);
      console.log('===============================================\n');
      return { success: true, message: 'Reset link logged to console (email not configured)' };
    }

    const transporter = createTransporter();

    // Verify transporter configuration
    await transporter.verify();

    const mailOptions = {
      from: `"E-Complaint System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request - E-Complaint System',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">E-Complaint System</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <h2 style="color: #333; margin-top: 0;">Password Reset Request</h2>
            
            <p>Hello ${name || 'User'},</p>
            
            <p>We received a request to reset your password for your E-Complaint System account.</p>
            
            <p>Click the button below to reset your password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block;
                        font-weight: bold;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Or copy and paste this link into your browser:<br>
              <a href="${resetUrl}" style="color: #667eea; word-break: break-all;">${resetUrl}</a>
            </p>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #856404;">
                <strong>⚠️ Important:</strong> This link will expire in 10 minutes. If you didn't request a password reset, please ignore this email.
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              If you're having trouble clicking the button, copy and paste the URL above into your web browser.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              This is an automated message. Please do not reply to this email.<br>
              © 2025 E-Complaint System. All rights reserved.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        Password Reset Request - E-Complaint System
        
        Hello ${name || 'User'},
        
        We received a request to reset your password for your E-Complaint System account.
        
        Click the link below to reset your password:
        ${resetUrl}
        
        This link will expire in 10 minutes. If you didn't request a password reset, please ignore this email.
        
        © 2025 E-Complaint System. All rights reserved.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

/**
 * Send complaint created notification email
 * @param {Object} options - Email options
 * @param {String} options.email - Recipient email
 * @param {String} options.name - Recipient name
 * @param {Object} options.complaint - Complaint object
 * @param {String} options.complaintUrl - URL to view complaint
 */
const sendComplaintCreatedEmail = async ({ email, name, complaint, complaintUrl }) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('\n=== COMPLAINT CREATED EMAIL (Development Mode) ===');
      console.log(`To: ${email}`);
      console.log(`Complaint: ${complaint.title}`);
      console.log(`Complaint Number: ${complaint.complaintNumber || complaint._id}`);
      console.log(`URL: ${complaintUrl}`);
      console.log('===================================================\n');
      return { success: true, message: 'Email logged to console (email not configured)' };
    }

    const transporter = createTransporter();
    await transporter.verify();

    const mailOptions = {
      from: `"E-Complaint System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Complaint Submitted - ${complaint.complaintNumber || complaint._id}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Complaint Submitted</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">E-Complaint System</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <h2 style="color: #333; margin-top: 0;">Complaint Submitted Successfully</h2>
            
            <p>Hello ${name || 'User'},</p>
            
            <p>Your complaint has been submitted successfully and is being reviewed by our team.</p>
            
            <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #1976d2;">
              <p style="margin: 0 0 10px 0;"><strong>Complaint Number:</strong> ${complaint.complaintNumber || complaint._id}</p>
              <p style="margin: 0 0 10px 0;"><strong>Title:</strong> ${complaint.title}</p>
              <p style="margin: 0 0 10px 0;"><strong>Category:</strong> ${complaint.category}</p>
              <p style="margin: 0 0 10px 0;"><strong>Priority:</strong> ${complaint.priority}</p>
              <p style="margin: 0 0 10px 0;"><strong>Status:</strong> <span style="color: #ff9800; font-weight: bold;">${complaint.status || 'Pending'}</span></p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${complaintUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block;
                        font-weight: bold;">
                View Complaint
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              You will receive email notifications when there are updates to your complaint.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              This is an automated message. Please do not reply to this email.<br>
              © 2025 E-Complaint System. All rights reserved.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        Complaint Submitted Successfully - E-Complaint System
        
        Hello ${name || 'User'},
        
        Your complaint has been submitted successfully.
        
        Complaint Number: ${complaint.complaintNumber || complaint._id}
        Title: ${complaint.title}
        Category: ${complaint.category}
        Priority: ${complaint.priority}
        Status: ${complaint.status || 'Pending'}
        
        View your complaint: ${complaintUrl}
        
        You will receive email notifications when there are updates to your complaint.
        
        © 2025 E-Complaint System. All rights reserved.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Complaint created email sent:', info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending complaint created email:', error);
    // Don't throw - email failures shouldn't break complaint creation
    return { success: false, error: error.message };
  }
};

/**
 * Send complaint status update email
 * @param {Object} options - Email options
 * @param {String} options.email - Recipient email
 * @param {String} options.name - Recipient name
 * @param {Object} options.complaint - Complaint object
 * @param {String} options.oldStatus - Previous status
 * @param {String} options.newStatus - New status
 * @param {String} options.complaintUrl - URL to view complaint
 */
const sendComplaintStatusUpdateEmail = async ({ email, name, complaint, oldStatus, newStatus, complaintUrl }) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('\n=== COMPLAINT STATUS UPDATE EMAIL (Development Mode) ===');
      console.log(`To: ${email}`);
      console.log(`Complaint: ${complaint.title}`);
      console.log(`Status Changed: ${oldStatus} → ${newStatus}`);
      console.log(`URL: ${complaintUrl}`);
      console.log('==========================================================\n');
      return { success: true, message: 'Email logged to console (email not configured)' };
    }

    const transporter = createTransporter();
    await transporter.verify();

    const statusColors = {
      'Pending': '#ff9800',
      'In Progress': '#2196f3',
      'Resolved': '#4caf50',
      'Rejected': '#f44336'
    };

    const mailOptions = {
      from: `"E-Complaint System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Complaint Status Updated - ${complaint.complaintNumber || complaint._id}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Complaint Status Updated</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">E-Complaint System</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <h2 style="color: #333; margin-top: 0;">Complaint Status Updated</h2>
            
            <p>Hello ${name || 'User'},</p>
            
            <p>The status of your complaint has been updated.</p>
            
            <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid ${statusColors[newStatus] || '#1976d2'};">
              <p style="margin: 0 0 10px 0;"><strong>Complaint Number:</strong> ${complaint.complaintNumber || complaint._id}</p>
              <p style="margin: 0 0 10px 0;"><strong>Title:</strong> ${complaint.title}</p>
              <p style="margin: 0 0 10px 0;"><strong>Previous Status:</strong> ${oldStatus}</p>
              <p style="margin: 0 0 10px 0;"><strong>New Status:</strong> <span style="color: ${statusColors[newStatus] || '#1976d2'}; font-weight: bold;">${newStatus}</span></p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${complaintUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block;
                        font-weight: bold;">
                View Complaint
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              This is an automated message. Please do not reply to this email.<br>
              © 2025 E-Complaint System. All rights reserved.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        Complaint Status Updated - E-Complaint System
        
        Hello ${name || 'User'},
        
        The status of your complaint has been updated.
        
        Complaint Number: ${complaint.complaintNumber || complaint._id}
        Title: ${complaint.title}
        Previous Status: ${oldStatus}
        New Status: ${newStatus}
        
        View your complaint: ${complaintUrl}
        
        © 2025 E-Complaint System. All rights reserved.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Complaint status update email sent:', info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending complaint status update email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send comment added notification email
 * @param {Object} options - Email options
 * @param {String} options.email - Recipient email
 * @param {String} options.name - Recipient name
 * @param {Object} options.complaint - Complaint object
 * @param {String} options.comment - Comment text
 * @param {String} options.commentedBy - Name of person who commented
 * @param {String} options.complaintUrl - URL to view complaint
 */
const sendCommentAddedEmail = async ({ email, name, complaint, comment, commentedBy, complaintUrl }) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('\n=== COMMENT ADDED EMAIL (Development Mode) ===');
      console.log(`To: ${email}`);
      console.log(`Complaint: ${complaint.title}`);
      console.log(`Comment by: ${commentedBy}`);
      console.log(`URL: ${complaintUrl}`);
      console.log('================================================\n');
      return { success: true, message: 'Email logged to console (email not configured)' };
    }

    const transporter = createTransporter();
    await transporter.verify();

    const mailOptions = {
      from: `"E-Complaint System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `New Comment on Complaint - ${complaint.complaintNumber || complaint._id}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Comment</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">E-Complaint System</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <h2 style="color: #333; margin-top: 0;">New Comment Added</h2>
            
            <p>Hello ${name || 'User'},</p>
            
            <p>A new comment has been added to your complaint.</p>
            
            <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #1976d2;">
              <p style="margin: 0 0 10px 0;"><strong>Complaint:</strong> ${complaint.title}</p>
              <p style="margin: 0 0 10px 0;"><strong>Complaint Number:</strong> ${complaint.complaintNumber || complaint._id}</p>
              <p style="margin: 10px 0 5px 0;"><strong>Comment by:</strong> ${commentedBy}</p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
                <p style="margin: 0; font-style: italic;">"${comment}"</p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${complaintUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block;
                        font-weight: bold;">
                View Complaint & Comment
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              This is an automated message. Please do not reply to this email.<br>
              © 2025 E-Complaint System. All rights reserved.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        New Comment Added - E-Complaint System
        
        Hello ${name || 'User'},
        
        A new comment has been added to your complaint.
        
        Complaint: ${complaint.title}
        Complaint Number: ${complaint.complaintNumber || complaint._id}
        Comment by: ${commentedBy}
        
        Comment:
        "${comment}"
        
        View your complaint: ${complaintUrl}
        
        © 2025 E-Complaint System. All rights reserved.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Comment added email sent:', info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending comment added email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send OTP verification email for registration
 * @param {Object} options - Email options
 * @param {String} options.email - Recipient email
 * @param {String} options.name - Recipient name
 * @param {String} options.otp - OTP code
 */
const sendOTPEmail = async ({ email, name, otp }) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('\n=== OTP VERIFICATION EMAIL (Development Mode) ===');
      console.log(`To: ${email}`);
      console.log(`Name: ${name}`);
      console.log(`OTP: ${otp}`);
      console.log('==================================================\n');
      return { success: true, message: 'OTP logged to console (email not configured)' };
    }

    const transporter = createTransporter();

    // Skip verify() to prevent timeout - verification happens during sendMail anyway
    // If email credentials are wrong, sendMail will fail with clear error

    const mailOptions = {
      from: `"E-Complaint System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Email Verification - OTP Code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">E-Complaint System</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <h2 style="color: #333; margin-top: 0;">Email Verification</h2>
            
            <p>Hello ${name || 'User'},</p>
            
            <p>Thank you for registering with the E-Complaint System. Please use the OTP code below to verify your email address and complete your registration.</p>
            
            <div style="background: white; padding: 30px; border-radius: 5px; margin: 30px 0; text-align: center; border: 2px dashed #1976d2;">
              <p style="margin: 0; font-size: 14px; color: #666; margin-bottom: 10px;">Your Verification Code:</p>
              <p style="margin: 0; font-size: 36px; font-weight: bold; color: #1976d2; letter-spacing: 8px; font-family: monospace;">
                ${otp}
              </p>
            </div>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #856404;">
                <strong>⚠️ Important:</strong> This OTP will expire in 10 minutes. If you didn't request this code, please ignore this email.
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Enter this code on the verification page to complete your registration.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              This is an automated message. Please do not reply to this email.<br>
              © 2025 E-Complaint System. All rights reserved.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        Email Verification - E-Complaint System
        
        Hello ${name || 'User'},
        
        Thank you for registering with the E-Complaint System. Please use the OTP code below to verify your email address and complete your registration.
        
        Your Verification Code: ${otp}
        
        This OTP will expire in 10 minutes. If you didn't request this code, please ignore this email.
        
        Enter this code on the verification page to complete your registration.
        
        © 2025 E-Complaint System. All rights reserved.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('OTP email sent:', info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendComplaintCreatedEmail,
  sendComplaintStatusUpdateEmail,
  sendCommentAddedEmail,
  sendOTPEmail,
};

