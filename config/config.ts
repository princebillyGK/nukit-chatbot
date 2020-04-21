import dotenv from 'dotenv';
dotenv.config();

export const BootbotConfig = {
  accessToken: process.env.ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET,
};