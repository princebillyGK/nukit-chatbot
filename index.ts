import BootBot from 'bootbot';
import { BootbotConfig as config} from './config/config';

import {openNavigation } from './controllers/common'
import {Router} from './routes/index'


const bot = new BootBot(config);
const port = process.env.PORT ? +process.env.PORT : 8080;

bot.on('message', Router);
bot.on('postback:OPEN_MENU', openNavigation);

bot.start(port);
