import { Navigation } from '../types/common';

export function navigationGenerator(heading: string, navigation: Navigation) {
    let responseText: string = `${heading}\n`;
    let counter = 0;
    responseText += navigation.map((item): string =>
        `${++counter}. type "${item.code.toLowerCase()}" for: ${item.title}`).join('\n');
    return responseText;
}