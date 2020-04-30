import { ConversationController } from '../abstract/ConversationController';
import { bnDictonary } from '../data/bangla-dictonary.data'
import * as nlp from '../lib/nlp';
import { start } from 'repl';


export class DictonaryController extends ConversationController {
    constructor(payload, chat) {
        super(chat);
        const text = payload.message.text;
        if(nlp.isInString(text, ['bengali', 'bangla'])) {
            //regex to get the word
            //send to bengali meaning finder
        } else if (nlp.isInString(text, ['english'])) {
            //regex to get the word
            //send to english meaning finder
        } else {
            //regex to get the word
            //send to unknown meaning finder
        }
    }

}