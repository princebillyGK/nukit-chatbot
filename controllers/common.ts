import { welcomeMsg } from '../components/Welcome';
import { navigationGenerator } from '../lib/responseGen';
import { mainMenu } from '../data/common'
import { NavigationQuickReply } from '../components/common'

export function welcomeText(payload, chat) {
    chat.getUserProfile().then((user) => {
        chat.say([
            { cards: welcomeMsg(user) },
            'type"nukit" to get started'
        ]);
    })
}

export function openNavigation(payload, chat) {
    chat.say({
        text: navigationGenerator("Select one of the options below:", mainMenu),
        quickReplies: NavigationQuickReply(mainMenu)
    });
}