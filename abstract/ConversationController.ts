import {canceledMessage, goodByeMessage, someErrorMessage, invalidInputMessage} from '../templates/common'
import { Navigation } from "../types/common";
import * as nlp from '../lib/nlp';

export abstract class ConversationController {
    public conversation;
    constructor(chat) {
        chat.conversation(convo => this.conversation = convo);
    }
    protected sendInvalidInput() {
        this.conversation.say(invalidInputMessage);
    }
    protected sendSomeThingWrong() {
        this.conversation.say(someErrorMessage);
        this.conversation.end();
    }
    protected cancelConversation() {
        this.conversation.say(canceledMessage);
        this.conversation.end();
    }
    protected goodBye() {
        this.conversation.say(goodByeMessage);
        this.conversation.end();
    }
    protected endConversation() {
        this.conversation.end();
    }
    protected getChoice(text: string, menu: Navigation, successCallback:CallableFunction, failCallback:CallableFunction, warning: boolean = false) {
        const matchedIndex = menu.findIndex((({ tags }) => nlp.isInString(text, tags)))
        if (matchedIndex != -1) {
            successCallback(matchedIndex);
        } else {
            if (warning) {
                this.conversation.say("Please Choose one of options or say cancel");
            }
            failCallback();
        }
    }
}

