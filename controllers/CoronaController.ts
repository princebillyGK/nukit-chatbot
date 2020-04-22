import { NavigationItem } from "../types/common";
import request from 'request-promise-native';
import { CoronaStatMsg, CoronaHelpline } from '../templates/corona';
import { ConversationController } from '../abstract/ConversationController'
import { REG_CANCEL } from '../lib/RegexTemplates';
import { NavigationMessage } from '../templates/common'

export class CoronaController extends ConversationController {
    private readonly sourceURL = 'https://corona-api.cramstack.com/';
    private readonly menuItem: NavigationItem[] = [
        {
            title: "Show Helplines",
            img: "https://i.ibb.co/xqMgtyh/help.png",
            tags: ["helpline", "contact", "mobile", "phone"],
            callback: () => this.showHelpline()
        },
        {
            title: "Corona news",
            img: "https://i.ibb.co/hFvsz9f/stat.png",
            tags: ["stat", "statist", "condition", "update", "news"],
            callback: () => this.showStat()
        }
    ];

    constructor(payload, chat) {
        super(chat);
        const txt: string = payload.message.text;
        this.getChoice(
            txt,
            this.menuItem,
            (index) => this.menuItem[index].callback(),
            () => this.showMenu());
    }


    showMenu() {
        const query = NavigationMessage("The following options are available", this.menuItem, { cancel: true });
        console.log(query);
        const answer = (payload, chat) => {
            const text = payload.message.text;
            if (text.match(REG_CANCEL)) {
                this.cancelConversation();
            } else {
                this.getChoice(
                    text,
                    this.menuItem,
                    (index) => this.menuItem[index].callback(),
                    () => this.showMenu(),
                    true
                );
            }
        };
        this.conversation.ask(query, answer, [], { typing: true });
    }

    showStat() {
        try {
            request(this.sourceURL).then(result => {
                const data = JSON.parse(result);
                this.conversation.say(CoronaStatMsg(data["today_daily_count"][0]));
                this.endConversation();
            })
        } catch (e) {
            this.sendSomeThingWrong()
            console.log(e);
        }
    }

    showHelpline() {
        this.conversation.say(CoronaHelpline);
        this.endConversation();
    }
}
