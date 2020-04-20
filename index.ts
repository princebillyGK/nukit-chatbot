import BootBot from 'bootbot';
import { BootbotConfig as config} from './config/config';
import * as command from './commands/common'

import { welcomeText, openNavigation } from './controllers/common'
import {CoronaController} from './controllers/corona';
import {ResultController} from './controllers/result'

const bot = new BootBot(config);
const port = process.env.PORT ? +process.env.PORT : 8080;

bot.on('message', (payload, chat) => {
	const text = payload.message.text;
	console.log(`The user said: ${text}`);
	// console.log(JSON.stringify(payload));
});


//welcome message
bot.hear(command.welcomeMessage, welcomeText);
//Show Menu/help
bot.on('postback:OPEN_MENU', openNavigation);
bot.hear(command.menu, openNavigation);
//Result Routes
bot.on('postback:RESULT',(payload, chat) => new ResultController(payload, chat));
bot.hear(command.result,(payload, chat) => new ResultController(payload, chat));

//corona
bot.on('postback:CORONA',(payload, chat) => new CoronaController(payload, chat));
bot.hear(command.corona,(payload, chat) => new CoronaController(payload, chat));

bot.start(port);
