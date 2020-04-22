"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
dotenv_1.config();
exports.mysql2Config = {
    chatbot: {
        production: {
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }
    }
};
