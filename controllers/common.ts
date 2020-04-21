import { welcomeMsg } from '../components/Welcome';
import { navigationGenerator } from '../lib/responseGen';
import { mainMenu } from '../data/common'
import { NavigationQuickReply, DonateButton, FeedBackButton } from '../components/common'
import { getMySQLConnection } from '../lib/database/mysql-connection';

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
    chat.say({
        text: navigationGenerator("Select one of the options below:", mainMenu),
        quickReplies: NavigationQuickReply(mainMenu)
    });
}

export async function sorryReply({ sender: { id: senderid }, message: { text } }, chat) {
    const msg = "Sorry I can't reconize your query with any of my services. I will keep it as log so that I can learn it leter. Type 'nukit' to see available options."
    chat.say(msg);
    chat.getUserProfile().then(async (user) => {
        try {
            let db = await getMySQLConnection();
            await db.execute("insert into chatbot_unknown_message(facebookid, message) values(?, ?)", [senderid, text]);
            await db.end();
            console.log('added to database')
        } catch (e) {
            console.log(e);
        }
    });
}