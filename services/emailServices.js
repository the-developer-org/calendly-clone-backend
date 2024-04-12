const nodemailer = require('nodemailer');
const emailConfig = require('../config/email.config');
const { slotEmailTemplate } = require('../templates/emailTemplates');
const ApiError = require('../util/ApiError');
const { EMAIL_FAILED } = require('../util/errorMessages');

const transport = nodemailer.createTransport({
  host: emailConfig.SMTP_HOST,
  port: emailConfig.SMPT_PORT,
  auth: {
    user: emailConfig.SMTP_USERNAME,
    pass: emailConfig.SMTP_PASSWORD,
  },
});

const emailService = {
  sendEmail: async (to, subject, html) => {
    const msg = { from: emailConfig.EMAIL_FROM, to, subject, html };
    await transport.sendMail(msg);
  },
  sendBookingConfirmationEmail: async ({
    eventName,
    eventStartTime,
    eventLink,
    userEmail,
  }) => {
    const subject = 'Email Verification';
    const html = slotEmailTemplate(eventName, eventStartTime, eventLink);
    const data = await emailService.sendEmail(userEmail, subject, html);
    if (data) {
      return data;
    }
    const { code, message, name } = EMAIL_FAILED;
    return new ApiError(code, message, name);
  },
};

module.exports = emailService;
