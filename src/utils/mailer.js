import nodemailer from 'nodemailer';
import config from '../config/config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mailUser,
    pass: config.mailPass
  }
});

export const sendRecoveryEmail = async (to, token) => {
  const resetLink = `${config.baseUrl}/api/password/reset/${token}`;

  await transporter.sendMail({
    from: `"Ecommerce App" <${config.mailUser}>`,
    to,
    subject: 'Restablecer contraseña',
    html: `
      <h2>Recuperar contraseña</h2>
      <p>Haz clic en el botón para restablecer tu contraseña. Este enlace expirará en 1 hora.</p>
      <a href="${resetLink}" style="padding:10px 20px;background:#4caf50;color:#fff;text-decoration:none;">Restablecer contraseña</a>
    `
  });
};
