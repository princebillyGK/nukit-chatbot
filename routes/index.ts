import * as nlp from "../lib/nlp";
import { Navigation } from '../types/common'
import { welcomeText, openNavigation, thankReply, goodByeReply, forgiveMeReply, sorryReply } from '../controllers/common'
import { CoronaController } from '../controllers/CoronaController';
import { ResultController } from '../controllers/ResultController'


export async function Router(payload, chat) {
    const text = payload.message.text;
    const mainMenu: Navigation = [

        {
            title: "Corona Info",
            code: "CORONA",
            img: "https://i.ibb.co/qJT18D3/corona-virus.png",
            tags: ['corona', 'covid'],
            callback: (payload, chat) => new CoronaController(payload, chat)
        },
        {
            title: "Check Results",
            code: 'RESULT',
            img: 'https://i.ibb.co/wQ3fTwf/result.png',
            tags: ['result', 'marks'],
            callback: (payload, chat) => new ResultController(payload, chat)
        },

        {
            title: "Navigation Menu",
            code: 'RESULT',
            img: 'https://i.ibb.co/wQ3fTwf/result.png',
            tags: ['nukit', 'menu', 'navigation', 'help'],
            callback: openNavigation
        }
        // {
        //     title: "Check News",
        //     code: 'NEWS',
        //     img: 'https://i.ibb.co/mFKXVys/news.png'
        // },
        // {
        //     title: "Report a bug",
        //     code: 'REPORT',
        //     img: 'https://i.ibb.co/tB5QL04/bug.png'
        // },
        // {
        //     title: "Donate",
        //     code: 'DONATE',
        //     img: ' https://i.ibb.co/k824zx7/donate.png'
        // },
    ]
    // const { sentiment: [{ value: conduct }] } = entities;

    const matchedMenuIndex = mainMenu.findIndex(({ tags }) => nlp.isInString(text, tags));

    if (matchedMenuIndex != -1) {
        mainMenu[matchedMenuIndex].callback(payload, chat);
    } else if (payload.message.hasOwnProperty("nlp")) {
        if (payload.message.nlp.hasOwnProperty('entities')) {
            const { entities } = payload.message.nlp;
            if (entities.hasOwnProperty("greetings")) {
                welcomeText(payload, chat);
            } else if (entities.hasOwnProperty("thanks")) {
                thankReply(payload, chat);
            } else if (entities.hasOwnProperty("bye")) {
                goodByeReply(payload, chat);
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
    // console.log(JSON.stringify(payload));
}