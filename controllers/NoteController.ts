import { REG_CANCEL } from '../lib/RegexTemplates'
import { NavigationMessage } from '../templates/common'
import { ConversationController } from '../abstract/ConversationController'
import { NavigationItem } from '../types/types';

export class NoteController extends ConversationController {
    private menuItem: NavigationItem[] = [
        {
            title: "Upload Note",
            tags: ['upload', 'insert'],
            img: 'https://i.ibb.co/HqG2TxH/upload.png',
            callback: () => this.showUploadLink()
        },
        {
            title: "Download Note",
            tags: ['download', 'get', 'show', 'print', 'give', 'search'],
            img: 'https://i.ibb.co/zNSCHSN/download.png',
            callback: () => this.showDownloadMenu()
        }
    ]

    constructor(payload, chat) {
        super(chat);
        const txt = payload.message.text;
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

    showUploadLink() {
        const reply = {
            text: 'Click here to open upload form',
            buttons: [
                {
                    type: "web_url",
                    url: "https://forms.gle/tgMY8BiVH9QF2Jcu7",
                    title: "Upload Files",
                    webview_height_ratio: "full",
                    messenger_extensions: "true"
                }
            ],
        };
        this.conversation.say(reply);
        this.conversation.end();
    }

    showDownloadMenu() {
        const reply = {
            text: 'Click here to open notes',
            buttons: [
                {
                    type: "web_url",
                    url: "www.example.com",
                    title: "View Notes",
                    webview_height_ratio: "full",
                    messenger_extensions: "true"
                }
            ]
        }
        this.conversation.say(reply);
        this.conversation.end();
    }
}
