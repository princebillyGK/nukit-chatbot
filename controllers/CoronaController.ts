import { Navigation } from "../types/common";
import request from 'request-promise-native';
import { CoronaStatMsg, CoronaHelpline } from '../templates/corona';
import * as nlp from '../lib/nlp';
import { ConversationController } from '../abstract/ConversationController'
import { REG_CANCEL } from '../lib/RegexTemplates';
import { NavigationMessage } from '../templates/common'

export class CoronaController extends ConversationController {
    private readonly sourceURL = 'https://corona-api.cramstack.com/';
    private readonly menuItem: Navigation = [
        {
            title: "Show Helplines",
            code: "CORONA_HELPLINE",
            img: "https://i.ibb.co/xqMgtyh/help.png",
            tags: ["helpline", "contact", "mobile", "phone"],
            callback: () => this.showHelpline()
        },
        {
            title: "Show Statistcs",
            code: "CORONA_STAT",
            img: "https://i.ibb.co/hFvsz9f/stat.png",
            tags: ["stat", "statist", "condition", "update", "news"],
            callback: () => this.showStat()
        }
    ];

    constructor(payload, chat) {
        super(chat);
        const txt: string = payload.message.text;
        const matchedIndex = this.menuItem.findIndex((({ tags }) => nlp.isInString(txt, tags)))
        console.log(matchedIndex)
        if (matchedIndex != -1) {
            this.menuItem[matchedIndex].callback();
        } else {
            this.showMenu();
        }
    }

    showMenu() {
        const query = NavigationMessage(this.menuItem);
        console.log(query);
        const callbacks = [
            {
                event: 'quick_reply',
                callback: (payload) => {
                    const event = payload.message.quick_reply.payload;
                    console.log(event)
                    if (event == "CANCEL") {
                        this.cancelConversation();
                        return;
                    }
                    console.log(event);
                    this.menuItem.find(item => item.code == event).callback()
                },
            },
            {
                pattern: REG_CANCEL,
                callback: (payload) => {
                    this.cancelConversation();
                    return;
                }
            }
        ]

        const answer = (payload, chat) => {
            const txt = payload.message.text;
            try {
                if (typeof this.menuItem[parseInt(txt) - 1] == 'undefined') throw new Error("Invalid Input");
                this.menuItem[parseInt(txt) - 1].callback();
            } catch (e) {
                this.sendInvalidInput();
                this.showMenu();
            }
        };
        this.conversation.ask(query, answer, callbacks, { typing: true });
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
