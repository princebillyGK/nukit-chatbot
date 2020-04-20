import { Commands } from '../types/common';

export const welcomeMessage: Commands = [
    /(\w)*he(y|i)(\w)*/i,
    /(\w)*hello(\w)*/i,
    /(\w)*hi(\w)*/i,
]

export const menu: Commands = [
    /(\w)*help(\w)*/i,
    /(\w)*menu(\w)*/i,
    /nukit/i
];

export const result: Commands = [
    /(\w)*result(\w)*/i,
    /(\w)*marks(\w)*/i,
];

export const news: Commands = [
    /(\w)*notice(\w)/i,
    /(\w)*news(\w)/i,
    /(\w)*announcement(\w)/i,
];

export const reportProblem: Commands = [
    /(\w)*report(\w)*/i,
    /(\w)*problem(\w)*/i,
    /(\w)*bug(\w)*/i,
];

export const donate: Commands = [
    /(\w)*donate(\w)*/i,
    /(\w)*donation(\w)*/i,
];

export const corona: Commands = [
    /(\w)*corona(\w)*/i
];
