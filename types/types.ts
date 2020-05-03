export type Commands = (string | RegExp)[];

//Navigation
export interface NavigationItemView {
    title: string,
    img: string,
}

export interface NavigationItemFunctional {
    title: string,
    tags: string[],
    callback?: CallableFunction
}

export interface NavigationMessageOptions {
    cancel?: boolean,
    reset?: boolean
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

//Course List
export type CourseList = Course[];

export interface FormOptions extends NavigationItem {
	value: string
}

export interface Course extends NavigationItem {
	urlExt: string
	parser: CallableFunction
	params: { field: string, title: string, options?: FormOptions[] }[]
}

//DictonaryWords
export interface DictonaryWord {
	pron: string[],
	bn: string,
	en: string,
	bn_syns: string[],
	en_syns: string[],
	sents: string[]
}

