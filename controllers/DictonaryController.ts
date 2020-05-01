import { ConversationController } from '../abstract/ConversationController';
import { bnDictonary } from '../data/dictonary/bangla-dictonary.data';
import { REG_FIND_MEANING } from '../data/dictonary/regex.data'
import { sorryReply } from './common';
import { DictonaryWord } from '../types/types';
import { toTitleCase } from '../lib/utill';

export class DictonaryController extends ConversationController {
    private readonly word: string;
    private result: DictonaryWord;
    private wordln: ("BN" | "EN");

    constructor(payload, chat) {
        super(chat);
        const text = payload.message.text;
        try {
            this.word = this.getWord(text.toLowerCase());
            console.log(this.word);
            this.findMeaning();
        } catch (e) {
            console.log(e);
            this.endConversation();
            sorryReply(payload, chat);
        }
    }

    private getWord(text: string): string {
        for (const regex of REG_FIND_MEANING) {
            const temp = text.match(regex)
            if (temp != null && temp[1] != undefined) {
                return temp[1];
            }
        }
        throw new Error("No word found");
    }

    private findMeaning() {
        // console.log(bnDictonary);
        this.result = bnDictonary.find(tempWord => ((tempWord.bn === this.word) || (tempWord.en === this.word)));
        if (this.result == undefined) {
            this.conversation.say("The word is unknown to me");
            this.endConversation();
            return;
        }

        //set word language
        if (this.result.bn == this.word) {
            this.wordln = "BN";
        } else {
            this.wordln = "EN";
        }

        // console.log(JSON.stringify(this.result))
        this.showWordDefination();
    }

    private showWordDefination() {
        const wordln = this.wordln;
        const textReply = `*${toTitleCase(this.word)}* অর্থ ${wordln == "BN" ? this.result.en : this.result.bn}
        ${wordln == "BN" && this.result.bn_syns.length != 0 ? "```more: " + this.result.en_syns.join(', ') + "```" : (this.result.en_syns.length != 0 ? "```more: " + this.result.bn_syns.join(', ') + "```" : "")}
        ${wordln == "EN" && this.result.sents.length != 0 ? '```Examples: ' + this.result.sents.join(', ').replace(/<[^>]*>?/gm, '') + '```' : ""}`
        const reply =
        {
            text: textReply,
            quickReplies: [
                ...this.result.bn_syns
                    .slice(0, 5)
                    .filter(str => str.split(" ").length <= 1)
                    .filter(str => bnDictonary.findIndex(item => item.bn == str) != -1)
                    .slice(0, 3)
                    .map(sugg => ({
                        content_type: "text",
                        title: `${sugg} meaning`,
                    })),
                ...this.result.en_syns
                    .slice(0, 5)
                    .filter(str => str.split(" ").length <= 1)
                    .filter(str => bnDictonary.findIndex(item => item.en == str) != -1)
                    .slice(0, 3)
                    .map(sugg => ({
                        content_type: "text",
                        title: `${sugg} meaning`,
                    }))
            ]
        }

        this.conversation.say(reply.quickReplies.length == 0 ? textReply : reply);
        this.endConversation();
    }
}