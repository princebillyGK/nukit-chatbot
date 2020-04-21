import { resultCatalog, rootUrl } from '../data/course.data';
import { REG_CANCEL, REG_RESET, REG_YES, REG_NO } from '../lib/RegexTemplates'
import { TemplateQuickReplies } from '../components/common';
import request from 'request-promise-native';
import { resultTextOutput } from '../templates/result';
import { checkServerStatusURL } from '../lib/utill';
import * as nlp from '../lib/nlp'
import { courseTags } from '../data/course.tag.data';
import { NavigationMessage } from '../templates/common'
import { ConversationController } from '../abstract/ConversationController'

export class ResultController extends ConversationController {

    private catagoryIndex: number;
    private courseIndex: number;

    constructor(payload, chat) {

        super(chat);
        console.log(checkServerStatusURL(rootUrl));
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
        const matchedCourseIndex = courseTags.findIndex(({ tags }) => nlp.isInString(txt, tags));
        const matchedCatagoryIndex = resultCatalog.findIndex(({ tags }) => nlp.isInString(txt, tags));

        if (matchedCourseIndex != -1) {

            this.catagoryIndex =
                resultCatalog.findIndex(({ code }) => courseTags[matchedCourseIndex].catagoryCode == code);
            this.courseIndex = resultCatalog[this.catagoryIndex]
                .courses.findIndex(({ code }) => courseTags[matchedCourseIndex].courseCode == code);
            this.startQuery();
        } else if (matchedCatagoryIndex != -1) {
            this.catagoryIndex = matchedCatagoryIndex;
            this.getCourse();
        } else {
            this.getCatagory();
        }
    }

    private getCatagory() {
        let query = NavigationMessage(resultCatalog);

        let answer = (payload, convo) => {
            const text = payload.message.text;
            try {
                let input = parseInt(text) - 1;
                console.log(resultCatalog[input]);
                this.catagoryIndex = input;
                this.getCourse();
            } catch (e) {
                this.sendInvalidInput();
                this.getCatagory();
            }
        }

        let cb = [
            {
                event: 'quick_reply',
                callback: (payload) => {
                    const event = payload.message.quick_reply.payload;
                    console.log(event)
                    if (event == "CANCEL") {
                        this.cancelConversation();
                        return;
                    }
                    this.catagoryIndex = resultCatalog.findIndex(item => item.code == payload.message.quick_reply.payload);
                    this.getCourse();
                },
            },
            {
                pattern: REG_CANCEL,
                callback: (payload) => {
                    this.cancelConversation();
                    return;
                }
            }
        ];

        this.conversation.ask(query, answer, cb, { typing: true });
    }

    private getCourse() {

        console.log(this.catagoryIndex);
        let query = NavigationMessage(resultCatalog[this.catagoryIndex].courses);
        let answer = (payload, convo) => {
            const text = payload.message.text;
            try {
                let input = parseInt(text) - 1;
                console.log(resultCatalog[this.catagoryIndex].courses[input].title);
                this.courseIndex = input;
                this.startQuery();
            } catch (e) {
                this.sendInvalidInput();
                this.getCourse();
            }
        }

        let cb = [
            {
                event: 'quick_reply',
                callback: (payload) => {
                    const event = payload.message.quick_reply.payload;
                    console.log(event)
                    if (event == "CANCEL") {
                        this.cancelConversation();
                        return;
                    }
                    this.courseIndex = resultCatalog[this.catagoryIndex].courses.findIndex(item => item.code == payload.message.quick_reply.payload);
                    this.startQuery();
                }
            },
            {
                pattern: REG_CANCEL,
                callback: (payload) => {
                    this.cancelConversation();
                    return;
                }
            }
        ];

        this.conversation.ask(query, answer, cb, { typing: true });
    };


    private async startQuery() {
        await this.conversation.say(
            `Anwer the following queries for ${resultCatalog[this.catagoryIndex].title} > ${resultCatalog[this.catagoryIndex].courses[this.courseIndex].title} result:`,
            { typing: true }
        );
        let firstQueryDone: boolean = false;
        let urlParams = [];
        const numberOfParams = await resultCatalog[this.catagoryIndex].courses[this.courseIndex].params.length;
        const queryFuncs = await resultCatalog[this.catagoryIndex].courses[this.courseIndex].params.map(param => {
            return (callbacks, index = 1) => {
                const txtQuery =
                    `Enter ${param.title}: ${firstQueryDone ? 'and type "reset" to restart the query' : ""}`;
                const query = {
                    text: txtQuery,
                    quickReplies: [
                        ...firstQueryDone ? [TemplateQuickReplies.reset] : [],
                        TemplateQuickReplies.cancel
                    ]
                }

                const answer = (payload, convo) => {
                    const text = payload.message.text;
                    if (text.match(REG_RESET) && firstQueryDone) {
                        this.startQuery();
                        return;
                    }
                    urlParams[param.field] = text;
                    firstQueryDone = true;
                    if (index < numberOfParams) {
                        callbacks[index](callbacks, index + 1);
                    } else this.showResult(urlParams);
                }

                const cb = [
                    {
                        event: 'quick_reply',
                        callback: (payload) => {
                            const event = payload.message.quick_reply.payload;
                            console.log(event)
                            if (event == "CANCEL") {
                                this.cancelConversation();
                                return;
                            } else if (event == "RESET") {
                                this.startQuery();
                                return
                            }
                        }
                    },
                    {
                        pattern: REG_CANCEL,
                        callback: (payload) => {
                            this.cancelConversation();
                            return;
                        }
                    },
                    {
                        pattern: REG_RESET,
                        callback: (payload) => {
                            this.startQuery();
                            return;
                        }
                    }
                ];

                this.conversation.ask(query, answer, cb, { typing: true });
            };
        });

        queryFuncs[0](queryFuncs);
    }

    private showResult(urlParams) {
        console.log(urlParams)
        let url = rootUrl + resultCatalog[this.catagoryIndex].courses[this.courseIndex].urlExt + '?';
        for (let key in urlParams) {
            url += `${key}=${urlParams[key]}&`
        }
        console.log(url);
        try {
            request(url).then((html => {
                console.log(html);
                const parser = resultCatalog[this.catagoryIndex].courses[this.courseIndex].parser;
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

        let question = {
            text: 'Do you want to see another result from this course?\ntype "yes" or "no"',
            quickReplies: [
                TemplateQuickReplies.yes,
                TemplateQuickReplies.cancel
            ]
        }
        console.log(question);
        let answer = (payload, chat) => { }
        const cb =
            [
                {
                    event: 'quick_reply',
                    callback: (payload) => {
                        const event = payload.message.quick_reply.payload;
                        console.log(event)
                        if (event == "CANCEL") {
                            this.cancelConversation();
                            return;
                        } else if (event == "YES") {
                            this.startQuery();
                            return
                        }
                    }
                },
                {
                    pattern: REG_CANCEL,
                    callback: (payload) => {
                        this.goodBye();
                        return;
                    }
                },
                {
                    pattern: REG_YES,
                    callback: (payload) => {
                        this.startQuery();
                        return;
                    }
                },
                {
                    pattern: REG_NO,
                    callback: (payload) => {
                        this.cancelConversation();
                        return;
                    }
                },
            ];

        this.conversation.ask(question, answer, cb, { typing: true });
    }
}
