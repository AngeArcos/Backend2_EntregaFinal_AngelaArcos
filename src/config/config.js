import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtResetSecret: process.env.JWT_RESET_SECRET,
  jwtExpires: process.env.JWT_EXPIRES,
  resetTokenExpires: process.env.RESET_TOKEN_EXPIRES,
  baseUrl: process.env.BASE_URL,
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS

};
