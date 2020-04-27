import { NavigationQuickReply } from '../components/common'
import {NavigationItemView } from '../types/types';
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

export const NavigationMessage = (heading:string, navigation:NavigationItemView[], options:DefaultNavigationMessageOptions =defaultNavigationMessageOptions) => {
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
        quickReplies: NavigationQuickReply(navigation)
    }
    return query;
}