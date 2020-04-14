import { resultCatalog, rootUrl } from '../data/result';
import { REG_CANCEL, REG_RESET } from '../lib/RegexTemplates'
import { cancelMessage, invalidInputMessage, someErrorMessage } from '../templates/common'
import { NavigationQuickReply } from '../components/common';
import request from 'request-promise-native';
import { NavigationItems } from 'types/common';
import {resultTextOutput} from '../templates/result';


export function startResultConversation(payload, chat) {
    function askCatagory(convo) {
        let query = 'Select one of the following catagory: \n';
        query += resultCatalog.map((item, index) => `Type ${index + 1} for ${item.type} catagory`).join('\n');
        let question = {
            text: query,
            quickReplies: NavigationQuickReply(
                resultCatalog.map(item => ({
                    title: item.type,
                    code: item.code,
                    img: item.img,
                }) as NavigationItems)
            )
        };


        let answer = (payload, convo) => {
            const text = payload.message.text;

            //check if user cancelled the conversation
            if (REG_CANCEL.test(text)) {
                convo.say(cancelMessage);
                convo.end();
                return;
            }

            try {
                let input = parseInt(text) - 1;
                convo.set('indexOfCatagory', input);
                askCourse(convo);
            } catch (e) {
                convo.say(invalidInputMessage).then(() => askCatagory(convo));
            }
        }

        let cb = [
            {
                event: 'quick_reply',
                callback: (payload) => {
                    convo.set('indexOfCatagory', resultCatalog.findIndex(item => item.code == payload.message.quick_reply.payload));
                    askCourse(convo);
                }
            }
        ];

        convo.ask(question, answer, cb, { typing: true });
    }

    function askCourse(convo) {
        let query = `Select one of the following course: \n`;
        let indexOfCatagory = convo.get('indexOfCatagory');
        query += resultCatalog[indexOfCatagory].courses
            .map((item, index) => `Type ${index + 1} for ${item.course}`).join('\n');
        let question = {
            text: query,
            quickReplies: NavigationQuickReply(
                resultCatalog[indexOfCatagory].courses.map(item => ({
                    title: item.course,
                    code: item.code,
                    img: item.img,
                }) as NavigationItems)
            )
        };
        let answer = (payload, convo) => {
            const text = payload.message.text;

            //check if user cancelled the conversation
            if (text.match(cancelMessage)) {
                convo.say(cancelMessage);
                convo.end();
                return;
            }
            try {
                let input = parseInt(text) - 1;
                convo.set('indexOfCourse', input);
                startQuery(convo);
            } catch (e) {
                convo.say(invalidInputMessage).then(() => askCourse(convo));
                console.log(e);
            }
        }

        let cb = [
            {
                event: 'quick_reply',
                callback: (payload) => {
                    convo.set('indexOfCourse', resultCatalog[indexOfCatagory].courses.findIndex(item => item.code == payload.message.quick_reply.payload));
                    startQuery(convo);
                }
            }
        ];

        convo.ask(question, answer, cb, { typing: true });
    };

    function startQuery(convo) {
        let indexOfCatagory = convo.get('indexOfCatagory');
        let indexOfCourse = convo.get('indexOfCourse');
        convo.say(
            `Anwer the following queries for ${resultCatalog[indexOfCatagory].type}>${resultCatalog[indexOfCatagory].courses[indexOfCourse].course} result:`,
            { typing: true }
        ).then(() => {
            let firstQueryDone: boolean = false;
            let numberOfParams = resultCatalog[indexOfCatagory].courses[indexOfCatagory].params.length;
            let queryFuncs = resultCatalog[indexOfCatagory].courses[indexOfCourse].params.map(field => {
                //making query list for nessesary parameters
                return (callbacks, index = 1) => {
                    let question = `Enter ${field.fieldDefination}: ${firstQueryDone ? 'and type "reset" to restart the query' : ""}`
                    let answer = (payload, convo) => {
                        const text = payload.message.text;
                        if (text.match(REG_RESET) && firstQueryDone) {
                            startQuery(convo);
                            return;
                        }
                        convo.set(field.field, text);
                        firstQueryDone = true;
                        if (index < numberOfParams) {
                            callbacks[index](callbacks, index + 1);
                        } else showResult(convo);
                    }
                    convo.ask(question, answer, [], { typing: true });
                };
            });
            queryFuncs[0](queryFuncs);

        });
    };

    function showResult(convo) {
        let indexOfCatagory = convo.get('indexOfCatagory');
        let indexOfCourse = convo.get('indexOfCourse');
        let url = rootUrl + resultCatalog[indexOfCatagory].courses[indexOfCourse].urlExt + '?';
        resultCatalog[indexOfCatagory].courses[indexOfCourse].params.forEach(param =>
            url += `${param.field}=${convo.get(param.field)}&`
        );

        console.log(url);
        try {
            request(url).then((html => {
                const parser = resultCatalog[indexOfCatagory].courses[indexOfCourse].parser;
                let parserResponse = parser(html);
                if (parserResponse) {
                    convo.say(resultTextOutput(parserResponse));
                }
                else {
                    convo.say('Result not found')
                }

            }));
        } catch (e) {
            convo.say(someErrorMessage);
            convo.end();
            return;
        }

        let question = {
            text: 'Do you want to see another result from this course?\ntype "yes" or "no"',
            quickReplies: ["yes", "no"]
        }

        let answer = (payload, chat) => {
            const text = payload.message.text;
            if (text.match(/(\w)*(yes)|(yea)|(yo)(\w)*/)) {
                startQuery(convo);
            } else {
                convo.say("Good bye. See you again.");
                convo.end()
            }
        }
        convo.ask(question, answer, [], { typing: true });
    };

    chat.conversation((convo) => {
        askCatagory(convo);
    });
}