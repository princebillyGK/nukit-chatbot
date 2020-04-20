import {canceledMessage, goodByeMessage, someErrorMessage, invalidInputMessage} from '../templates/common'

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
}

