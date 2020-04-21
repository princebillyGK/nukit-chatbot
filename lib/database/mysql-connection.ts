import mysql from 'mysql2/promise';
import {mysql2Config} from '../../config/database-config/mysql2-config'

export async function getMySQLConnection() {
     return await mysql.createConnection(mysql2Config.chatbot.production);
}
console.log(mysql2Config.chatbot.production)