import * as nlp from "../lib/nlp";
import { NavigationItemFunctional } from '../types/types'
import { welcomeText, openNavigation, thankReply, goodByeReply, forgiveMeReply, sorryReply } from '../controllers/common'
import { CoronaController } from '../controllers/CoronaController';
import { ResultController } from '../controllers/ResultController'
import { DictonaryController } from '../controllers/DictonaryController'


export async function Router(payload, chat) {
    const text = payload.message.text;

    const mainMenu: NavigationItemFunctional[] = [
        {
            title: "Dictonary",
            tags: ['meaning', 'bengali', 'english', 'dictonary', 'mean', 'definition'],
            callback: (payload, chat) => new DictonaryController(payload, chat)
        },
        {
            title: "Corona Info",
            tags: ['corona', 'covid'],
            callback: (payload, chat) => new CoronaController(payload, chat)
        },
        {
            title: "Check Results",
            tags: ['result', 'marks'],
            callback: (payload, chat) => new ResultController(payload, chat)
        },

        {
            title: "Navigation Menu",
            tags: ['nukit', 'menu', 'navigation', 'help'],
            callback: openNavigation
        }
        // {
        //     title: "Check News",
        //     code: 'NEWS',
        //     img: 'https://i.ibb.co/mFKXVys/news.png'
        // },
        // {
        // },
    ]
    // const { sentiment: [{ value: conduct }] } = entities;

    const matchedMenuIndex = mainMenu.findIndex(({ tags }) => nlp.isInString(text, tags));

    if (matchedMenuIndex != -1) {
        mainMenu[matchedMenuIndex].callback(payload, chat);
    } else if (payload.message.hasOwnProperty("nlp")) {
        if (payload.message.nlp.hasOwnProperty('entities')) {
            const { entities } = payload.message.nlp;
            if (entities.hasOwnProperty("thanks")) {
                thankReply(payload, chat);
            } else if (entities.hasOwnProperty("bye")) {
                goodByeReply(payload, chat);
            } else if (entities.hasOwnProperty("greetings")) {
                welcomeText(payload, chat);
            } else if (entities.hasOwnProperty("sentiment")) {
                if (entities.sentiment[0].value == "negative") {
                    forgiveMeReply(payload, chat);
                } else {
                    sorryReply(payload, chat);
                }
            } else {
                sorryReply(payload, chat);


            }
        }
    } else {
        sorryReply(payload, chat);
    }
    console.log(text);
    // console.log(JSON.stringify(payload));
}