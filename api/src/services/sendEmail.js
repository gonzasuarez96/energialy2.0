require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const sendConfirmationEmail = (email, token, accessToken) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_USERNAME,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });

    const customMessage = '¡Gracias por registrarte en nuestro sitio! Haz clic en el siguiente enlace para confirmar tu registro:';
    const confirmationLink = `${process.env.APP_URL}`

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Confirm Your Registration',
        text: `${customMessage}\n\n${confirmationLink}`,
        html: `<p>${customMessage}</p><p><a href="${confirmationLink}">Confirmar registro</a></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending confirmation email:', error);
        } else {
            console.log('Confirmation email sent:', info.response);
        }
    });
};

module.exports = { sendConfirmationEmail };