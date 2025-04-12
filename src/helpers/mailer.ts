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

// Function to send verification email
export const verificationMail = async (email: string, token: string) => {

  const verificationLink = token

  // email content

  const mailOptions = {
    // sender address
    from: config.user, 
    to: email,        
    subject: 'Email Verification', 
    text: 'Please verify your email address',
    html: `<p>Please verify your email address by clicking on the verification link ${verificationLink}.</p>`,  
  };

  // send mail
  try {
    const info =await transporter.sendMail(mailOptions);
    console.log('Verification email sent!',info.messageId);

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw Error('Failed to send email');
  }
};
