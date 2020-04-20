import { NavigationQuickReply } from '../components/common'
import {Navigation } from '../types/common';
export const invalidInputMessage = '⚠️ | Invalid input';
export const someErrorMessage = '🤔 | Something went wrong please try again letter';
export const canceledMessage = '😧 | Ok fine.';
export const goodByeMessage = '👋 | Good Bye for now! See you again';

export const NavigationMessage = (navigations:Navigation) => {
    const question = `Select one of the following options are available:\n${
        navigations.map(({ title }, index) =>
            `Type ${index + 1} for ${title}`
        ).join('\n')}\nOr type "cancel" to cancel this conversation\n`;
    const query = {
        text: question,
        quickReplies: NavigationQuickReply(navigations)
    }
    return query;
}