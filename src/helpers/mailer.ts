// Simplified function to send a verification email without tokens
import nodemailer from 'nodemailer';
import config from '../../src/config/config'

const transporter = nodemailer.createTransport({
  host: config.host,
  port: config.mail_Port,
  secure: false,
  auth: {
    user: config.user,
    pass: config.pass,
  },
});

// Function to send a simple verification email
export const sendSimpleVerificationMail = async (email: string) => {
  const mailOptions = {
    from: config.user,  // sender address
    to: email,          // recipient address
    subject: 'Email Verification',  // email subject
    text: 'Please verify your email address.',  // plain text body
    html: '<p>Please verify your email address.</p>',  // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
