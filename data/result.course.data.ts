
import * as resultParser from '../lib/resultParser'
import { NavigationItems } from '../types/common';

type CourseList = Course[];

interface Course extends NavigationItems {
	urlExt: string
	parser: CallableFunction
	params: { field: string, title: string }[]
}

export const CourseList: CourseList = [
	{
		title: "CSE",
		urlExt: "cse/cse_result.php",
		parser: resultParser.parser1,
		tags: ['cse'],
		img: 'https://i.ibb.co/Bt0RRw9/cse-course.png',
		params: [
			{
				field: "reg_no",
				title: "Registration Number"
			},
			{
				field: "exm_code",
				title: "Exam Code (According to Admit Card)"
			},
			{
				field: "exam_year",
				title: "Exam Year (According to Admit card)"
			}
		],
	},
	{
		title: "BBA",
		urlExt: "bba/individual_result_show.php",
		parser: resultParser.parser2,
		tags: ['bba'],
		img: 'https://i.ibb.co/rFnyyQQ/bba-course.png',
		params: [
			{
				field: "roll_number",
				title: "Registration Number"
			},
			{
				field: "semester",
				title: "Exam Code (According to Admit Card)"
			},
			{
				field: "exam_year",
				title: "Exam Year (According to Admit card)"
			}
		],

	}
]

export const rootUrl = "http://www.nu.ac.bd/results/";