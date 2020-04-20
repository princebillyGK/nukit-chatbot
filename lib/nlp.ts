import { PorterStemmer, WordTokenizer, Tokenizer } from 'natural';
const { stem } = PorterStemmer;
const tokenizer = new WordTokenizer();


export function isInString(txt: string, tags: string[]) {
    const target = tokenizer.tokenize(txt);
    tags = tags.map(tag => stem(tag));

    for (let targetword of target) {
        for (let templateword of tags) {
            if (stem(targetword) === templateword) {
                return true
            }
        }
    }
    return false;
};