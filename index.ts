import BootBot from 'bootbot';
import { BootbotConfig as config} from './config/config';

import {openNavigation } from './controllers/common'
import {CoronaController} from './controllers/CoronaController';
import {ResultController} from './controllers/ResultController'
import {Router} from './routes/index'


const bot = new BootBot(config);
const port = process.env.PORT ? +process.env.PORT : 8080;

bot.on('message', Router);
//postbacks router
bot.on('postback:OPEN_MENU', openNavigation);
bot.on('postback:RESULT',(payload, chat) => new ResultController(payload, chat));
bot.on('postback:CORONA',(payload, chat) => new CoronaController(payload, chat));

bot.start(port);
