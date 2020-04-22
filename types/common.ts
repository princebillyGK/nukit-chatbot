export type Commands = (string | RegExp)[];
export interface NavigationItemView {
    title: string,
    img: string,
}

export interface NavigationItemFunctional {
    title: string,
    tags: string[],
    callback?: CallableFunction
}

export interface NavigationItem extends NavigationItemView, NavigationItemFunctional {}

//result parser
export interface ResultParserSuccessOutput {
    title: string,
    student: string,
    studentType: string,
    cgpa: string,
    grades: { [key: string]: string }
}

export type ResultParserOutput = ResultParserSuccessOutput | false;

export interface ResultParser {
    (html: string): ResultParserOutput;
};
