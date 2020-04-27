import { welcomeMsg } from '../components/Welcome';
import { mainMenu } from '../data/common'
import { DonateButton, FeedBackButton } from '../components/common'
import {NavigationMessage} from '../templates/common';
import ibmdb from 'ibm_db';

export function welcomeText(payload, chat) {
    chat.getUserProfile().then((user) => {
        chat.say([
            { cards: welcomeMsg(user) },
            'type"nukit" to get started'
        ]);
    })
}

export function thankReply(payload, chat) {
    chat.getUserProfile().then((user) => {
        const reply = {
            text: `you are welcome ${user.first_name}. Would you like to donate me?`,
            buttons: [
                DonateButton,
            ]
        }
        chat.say(reply);
    });
}
//TODO REPORT A BUG
export function forgiveMeReply(payload, chat) {
    const msg = {
        text: `I am really sorry. I am under developement. My developer is always working hard to develope me. If you have faced any problem or want to request new feature you can leave a feedback`,
        buttons: [
            FeedBackButton
        ]
    }
    chat.say(msg);
}

export function goodByeReply(payload, chat) {
    chat.getUserProfile().then((user) => {
        const msg = {
            text: `Good Bye ${user.first_name}. See you again.`,
            buttons: [
                DonateButton
            ]
        }
        chat.say(msg);
    });
}

export function openNavigation(payload, chat) {
    chat.say(NavigationMessage("You can choose between any of the options", mainMenu));
}

export async function sorryReply({ sender: { id: senderid }, message: { text } }, chat) {
    const msg = "Sorry I can't reconize your query with any of my services. I will keep it as log so that I can learn it later. Type 'nukit' to see available options."
    await chat.say(msg);
    chat.getUserProfile().then(async (user) => {
        try {
            ibmdb.open(process.env.DB2_DSN, function (err, conn) {
                if (err) return console.log(err);
                const query = `INSERT INTO  "LFT32896"."CHATBOT_UNKOWN_MESSAGE"("FACEBOOKID", "MESSAGE") VALUES('${senderid}', '${text}')`
                 console.log(query);
                conn.query(query, function (err, data) {
                    if (err) console.log(err);
                    else console.log(data);
                    conn.close(function () {
                        console.log('done');
                    });
                });
            });
        } catch (e) {
            console.log(e);
        }
    });
}
