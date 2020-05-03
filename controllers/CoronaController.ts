import { NavigationItem } from "../types/types";
import request from 'request-promise-native';
import {CoronaHelpline } from '../templates/corona';
import { ConversationController } from '../abstract/ConversationController'
import { REG_CANCEL } from '../lib/RegexTemplates';
import { NavigationMessage } from '../templates/common'
import * as coronaData from '../data/corona/corona.data'
export class CoronaController extends ConversationController {
    private readonly sourceURL = 'https://api.thevirustracker.com/free-api?global=stats&countryTotal=BD';
    private readonly menuItem: NavigationItem[] = [
        {
            title: "Show Helplines",
            img: "https://i.ibb.co/xqMgtyh/help.png",
            tags: ["helpline", "contact", "mobile", "phone", "hotline"],
            callback: () => this.showHelpline()
        },
        {
            title: "Corona News",
            img: "https://i.ibb.co/qL82cht/news.png",
            tags: ["stat", "statist", "condition", "update", "news"],
            callback: () => this.showStat()
        },
        {
            title: "Corona Symptoms",
            img: "i.ibb.co/0cY56q7/corona-symptom.png",
            tags: ["syndrome", "sign", "symptoms"],
            callback: () => this.showTextData("symptoms")
        },
        {
            title: "Corona Prevention",
            img: "https://i.ibb.co/4RVLfFn/corona-prevention.png",
            tags: ["prevention", "prevent"],
            callback: () => this.showTextData("prevention")
        },
        {
            title: "Corona Treatment",
            img: "https://i.ibb.co/ZB7mq6P/corona-treatment.png",
            tags: ["treat", "treatment", "cure"],
            callback: () => this.showTextData("treatment")
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
            request(this.sourceURL).then(data => {
        let [{ results: [globalData] }, { countrydata: [localData] }] =
            data.split(/(?=\n{)/).map(data => JSON.parse(data));
        let globalResult = '', localResult = '';
        let keyTitles = {
            total_cases: 'মোট আক্রান্ত',
            total_recovered: 'মোট সুস্থ',
            total_deaths: 'মোট মৃত্যু',
            total_new_cases_today: 'আজকে মোট আক্রান্ত',
            total_new_deaths_today: 'আজকে মোট মৃত্যু',
            total_active_cases: 'বর্তমানে আক্রান্ত',
            total_serious_cases: 'বর্তমান গুরুতর অবস্থা',
            total_affected_countries: 'আক্রান্ত দেশের সংখ্যা',
            total_danger_rank: 'গ্লোবাল র‍্যাঙ্কিং'
        };
        for (let key in globalData) {
            if (keyTitles[key]) {
                globalResult += `> ${keyTitles[key]}: ${globalData[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n`;
            }
        }
        let localPlace = localData.info.title;
        for (let key in localData) {
            if (keyTitles[key]) {
                localResult += `> ${keyTitles[key]}: ${localData[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n`;
            }
        }
        const reply =  '*Global News:*\n' + globalResult + `\n*${localPlace} News:*\n` + localResult;
                this.conversation.say(reply);
                this.endConversation();
            })
        } catch (e) {
            this.sendSomeThingWrong()
            console.log(e);
        }
    }

    private showHelpline() {
        this.conversation.say(CoronaHelpline);
        this.endConversation();
    }

    private showTextData(key:string) {
        this.conversation.say(coronaData[key]);
        this.conversation.end();
    }

}
