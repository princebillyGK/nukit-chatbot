import BootBot from 'bootbot';
import { BootbotConfig as config } from './config/config';
import * as command from './commands/common'

import { welcomeText, openNavigation } from './controllers/common'
import {startResultConversation} from './controllers/result';

const bot = new BootBot(config);
const port = process.env.PORT ? +process.env.PORT : 8080;

bot.on('message', (payload, chat) => {
	const text = payload.message.text;
	console.log(`The user said: ${text}`);
});


//welcome message
bot.hear(command.welcomeMessage, welcomeText);
//Show Menu/help
bot.on('postback:OPEN_MENU', openNavigation);
bot.hear(command.menu, openNavigation);
//Result Routes
bot.on('postback:RESULT', startResultConversation);
bot.hear(command.result, startResultConversation);

bot.start(port);
