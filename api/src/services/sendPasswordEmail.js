require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const sendPasswordEmail = (email, accessToken) => {
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

    const customMessage = 'Estimado/a Usuario,';
    const resetPasswordLink = `${process.env.APP_URL}/resetPassword`;

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Restablecimiento de Contraseña - [Energialy]',
        text: `${customMessage}\n\nHemos recibido una solicitud para restablecer la contraseña de tu cuenta en [Nombre de la Plataforma]. Para continuar, por favor, sigue este enlace:\n${resetPasswordLink}`,
        html: `
            <p>${customMessage}</p>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Energialy.</p>
            <p>Por favor, sigue este enlace para restablecer tu contraseña:</p>
            <p><a href="${resetPasswordLink}">Restablecer Contraseña</a></p>
            <p>Si no solicitaste este cambio o tienes alguna pregunta, por favor, contáctanos inmediatamente.</p>
            <p>Atentamente,</p>
            <p>El Equipo de Soporte de Energialy</p>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending password reset email:', error);
        } else {
            console.log('Password reset email sent:', info.response);
        }
    });
};

module.exports = { sendPasswordEmail };