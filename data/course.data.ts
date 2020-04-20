
import * as resultParser from '../lib/resultParser'
type CourseCatalog = Catagory[];
interface Catagory {
	title: string,
	code: string,
	img: string, 
	tags: string[],
	courses: Course[]
};
interface Course {
	title: string
	code: string
	urlExt: string
	parser: CallableFunction
	img: string
	params: {field:string, title:string}[]
}

export const resultCatalog:CourseCatalog = [
	{
		title: "Professional",
		code: 'PROF',
		img: 'https://i.ibb.co/zf0MQ2H/professional-catagory.png',
		tags: ['professional', 'prof'],
		courses: [
			{
				title: "CSE",
				code: 'CSE',
				urlExt: "cse/cse_result.php",
				parser: resultParser.parser1,
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
				code: 'BBA',
				urlExt: "bba/individual_result_show.php",
				parser: resultParser.parser2,
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
	}
]

export const rootUrl = "http://www.nu.ac.bd/results/";