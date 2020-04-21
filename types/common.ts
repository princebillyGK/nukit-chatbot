export type Commands = (string | RegExp)[];

export interface NavigationItems {
    title: string,
    code: string
    img: string,
    tags?: string[],
    callback? : CallableFunction
}

export type Navigation = NavigationItems[];

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
