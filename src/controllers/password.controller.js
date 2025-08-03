import { sendRecoveryEmail } from '../utils/mailer.js';
import { generateResetToken, verifyResetToken, resetPassword } from '../services/password.service.js';

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const token = generateResetToken(email);
    await sendRecoveryEmail(email, token);
    res.json({ status: 'success', message: 'Correo enviado' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Error al enviar el correo' });
  }
};

export const performPasswordReset = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const payload = verifyResetToken(token);
  if (!payload) {
    return res.status(400).json({ status: 'error', message: 'Token inválido o expirado' });
  }

  try {
    await resetPassword(payload.email, password);
    res.json({ status: 'success', message: 'Contraseña actualizada' });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};
