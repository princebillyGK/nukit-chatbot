import { NavigationQuickReply } from '../components/common'
import {NavigationItemView, NavigationMessageOptions } from '../types/types';
export const invalidInputMessage = '⚠️ | Invalid input';
export const someErrorMessage = '🤔 | Something went wrong please try again letter';
export const canceledMessage = '😧 | Ok fine.';
export const goodByeMessage = '👋 | Good Bye for now! See you again';

const defaultNavigationMessageOptions:NavigationMessageOptions = {
    cancel: false,
    reset: false
}

export const NavigationMessage = (heading:string, navigation:NavigationItemView[], options:NavigationMessageOptions =defaultNavigationMessageOptions) => {
    let text: string = `${heading}\n`;
    text+= navigation.map((item): string =>
        `> ${item.title}`).join('\n');
    text += '\n';

    if(options.reset){
        text+= `> Reset\n`
    }
    if(options.cancel){
        text+= `> Cancel\n`
    }

    const query = {
        text,
        quickReplies: NavigationQuickReply(navigation, options)
    }
    return query;
}