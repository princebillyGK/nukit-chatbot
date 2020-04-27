import { rootUrl, courseList } from '../data/result.course.data';
import { REG_CANCEL, REG_RESET, REG_YES, REG_NO } from '../lib/RegexTemplates'
import { TemplateQuickReplies } from '../components/common';
import request from 'request-promise-native';
import { resultTextOutput } from '../templates/result';
import { checkServerStatusURL } from '../lib/utill';
import { NavigationMessage, invalidInputMessage } from '../templates/common'
import { ConversationController } from '../abstract/ConversationController'

export class ResultController extends ConversationController {

    private courseIndex: number;

    constructor(payload, chat) {
        super(chat);
        try {
            request(checkServerStatusURL(rootUrl)).then(html => {
                const { result, error } = JSON.parse(html);
                if (result === false) {
                    throw new Error("Server not active");
                } else if (error) {
                    throw error
                }
            })
        } catch (e) {
            console.log(e);
            this.conversation.say("The server www.nu.ac.bd is currently down so, we cannot retrive result. Please try again later");
            this.sendSomeThingWrong()
            return;
        }

        const txt = payload.message.text;
        this.getChoice(
            txt,
            courseList,
            (index) => {
                this.courseIndex = index
                this.startQuery();
            },
            () => this.getCourse(),
        )
    }


    private getCourse() {
        let query = NavigationMessage("Select one course from the list", courseList, { cancel: true });
        let answer = (payload, chat) => {
            const text = payload.message.text;
            if (text.match(REG_CANCEL)) {
                this.cancelConversation();
            } else {
                this.getChoice(
                    text,
                    courseList,
                    (index) => {
                        this.courseIndex = index
                        this.startQuery();
                    },
                    () => this.getCourse(),
                    true
                )
            }
        }
        this.conversation.ask(query, answer, [], { typing: true });
    };


    private async startQuery() {
        await this.conversation.say(
            `Anwer the following queries for ${courseList[this.courseIndex].title} result:`,
            { typing: true }
        );

        let firstQueryDone: boolean = false;
        let urlParams = [];
        const numberOfParams = courseList[this.courseIndex].params.length;

        const queryFuncs = await courseList[this.courseIndex].params.map((param, funcIndex) => {
            return (callbacks, index = 1) => {
                let query;
                if (typeof param.options !== "undefined") {
                    console.log("Has Methods");
                    query = NavigationMessage(
                        `Select your ${param.title}`,
                        param.options,
                        {cancel: true }
                    );
                } else {
                    const txtQuery =
                        `Enter ${param.title}: ${firstQueryDone ? 'and type "reset" to restart the query' : ""}`;
                    query = {
                        text: txtQuery,
                        quickReplies: [
                            ...firstQueryDone ? [TemplateQuickReplies.reset] : [],
                            TemplateQuickReplies.cancel
                        ]
                    }
                }

                const answer = (payload, convo) => {
                    const text = payload.message.text;
                    if (text.match(REG_CANCEL)) {
                        this.cancelConversation();
                    } else if (text.match(REG_RESET) && firstQueryDone) {
                        this.startQuery();
                    } else {
                        if (typeof param.options !== "undefined") {
                            this.getChoice(text, param.options, (index) => {
                                urlParams[param.field] = param.options[index].value
                            },
                                () => {
                                    this.conversation.say(invalidInputMessage);
                                    queryFuncs[funcIndex](queryFuncs);
                                })
                        } else {
                            urlParams[param.field] = text;
                        }
                        firstQueryDone = true;
                        if (index < numberOfParams) {
                            callbacks[index](callbacks, index + 1);
                        } else {
                            this.showResult(urlParams);
                        }
                    }
                }
                this.conversation.ask(query, answer, [], { typing: true });
            };
        });

        queryFuncs[0](queryFuncs);
    }

    private async showResult(urlParams) {
        console.log(urlParams)
        let url = rootUrl + courseList[this.courseIndex].urlExt + '?';
        for (let key in urlParams) {
            url += `${key}=${urlParams[key]}&`
        }
        console.log(url);
        try {
            await request(url).then((html => {
                console.log(html);
                const parser = courseList[this.courseIndex].parser;
                let parserResponse = parser(html);
                if (parserResponse) {
                    this.conversation.say(resultTextOutput(parserResponse));
                }
                else {
                    this.conversation.say('Result not found')
                }
            }));
        } catch (e) {
            console.log(e)
            this.sendSomeThingWrong();
            return;
        }
        this.confirmExit();
    }


    private confirmExit() {
        let question = {
            text: 'Do you want to see another result from this course?\ntype "yes" or "no"',
            quickReplies: [
                TemplateQuickReplies.yes,
                TemplateQuickReplies.no,
            ]
        }

        console.log(question);
        let answer = (payload, chat) => {
            const text = payload.message.text;
            if (text.match(REG_YES)) {
                this.startQuery();
            } else if (text.match(REG_NO) || text.match(REG_CANCEL)) {
                this.cancelConversation();
            } else {
                chat.say("I didn't understand what you have said");
                this.confirmExit();
            }
        }
        this.conversation.ask(question, answer, [], { typing: true });
    }
}
