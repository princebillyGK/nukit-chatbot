
import * as resultParser from '../lib/resultParser'
export const resultCatalog = [
	{
		type: "Professional",
		code: 'OP_PROF',
		img: 'https://i.ibb.co/zf0MQ2H/professional-catagory.png',
		courses: [
			{
				course: "CSE",
				code: 'OP_PROF_CSE',
				urlExt: "cse/cse_result.php",
				parser: resultParser.parser1,
				img: 'https://i.ibb.co/Bt0RRw9/cse-course.png',
				params: [
					{
						field: "reg_no",
						fieldDefination: "Registration Number"
					},
					{
						field: "exm_code",
						fieldDefination: "Exam Code (According to Admit Card)"
					},
					{
						field: "exam_year",
						fieldDefination: "Exam Year (According to Admit card)"
					}
				],
			},
			{
				course: "BBA",
				code: 'OP_PROF_BBA',
				urlExt: "bba/individual_result_show.php",
				parser: resultParser.parser2,
				img: 'https://i.ibb.co/rFnyyQQ/bba-course.png',
				params: [
					{
						field: "roll_number",
						fieldDefination: "Registration Number"
					},
					{
						field: "semester",
						fieldDefination: "Exam Code (According to Admit Card)"
					},
					{
						field: "exam_year",
						fieldDefination: "Exam Year (According to Admit card)"
					}
				],

			}
		]//courses
	}
]//types

export const rootUrl = "http://www.nu.ac.bd/results/";