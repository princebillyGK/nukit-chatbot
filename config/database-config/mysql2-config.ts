import { config as attachENV } from 'dotenv';
attachENV();

export const mysql2Config = {
    chatbot: {
        production: {
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        }
    }
}