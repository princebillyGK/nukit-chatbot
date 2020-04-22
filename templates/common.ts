import { NavigationQuickReply } from '../components/common'
import {Navigation } from '../types/common';
export const invalidInputMessage = '⚠️ | Invalid input';
export const someErrorMessage = '🤔 | Something went wrong please try again letter';
export const canceledMessage = '😧 | Ok fine.';
export const goodByeMessage = '👋 | Good Bye for now! See you again';

interface DefaultNavigationMessageOptions {
    cancel?: boolean,
    reset?: boolean
}
const defaultNavigationMessageOptions = {
    cancel: false,
    reset: false
}

export const NavigationMessage = (heading, navigation:Navigation, options:DefaultNavigationMessageOptions =defaultNavigationMessageOptions) => {
    let text: string = `${heading}\n`;
    let counter = 0;
    text+= navigation.map((item): string =>
        `${++counter}. ${item.title}`).join('\n');

    if(options.reset){
        text+= `\n${++counter}. Reset\n`
    }
    if(options.cancel){
        text+= `\n${++counter}. Cancel\n`
    }

    const query = {
        text,
        quickReplies: NavigationQuickReply(navigation)
    }
    return query;
}