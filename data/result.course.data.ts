
import * as resultParser from '../lib/resultParser'
import { NavigationItem, CourseList, FormOptions } from '../types/types';
import { FixedLengthArray } from '../types/util';

const numberWithTags: NavigationItem[] = [
	{
		title: '1st',
		tags: ['1st', 'first', '1', 'one'],
		img: 'https://i.ibb.co/hLRkPC4/1.png'
	},
	{
		title: '2nd',
		tags: ['2nd', 'second', '2', 'two'],
		img: 'https://i.ibb.co/FgwFvMF/2.png'
	},
	{
		title: '3rd',
		tags: ['3rd', 'third', '3', 'three'],
		img: 'https://i.ibb.co/4Sk3qmL/3.png'
	},
	{
		title: '4th',
		tags: ['4th', 'fourth', '4', 'four'],
		img: 'https://i.ibb.co/R6t5p9V/4.png'
	},
	{
		title: '5th',
		tags: ['5th', 'fifth', '5', 'five'],
		img: 'https://i.ibb.co/X2Kct74/5.png'
	},
	{
		title: '6th',
		tags: ['6th', 'sixth', '6', 'six'],
		img: 'https://i.ibb.co/4Zn56q9/6.png'
	},
	{
		title: '7th',
		tags: ['7th', 'seventh', '7', 'seven'],
		img: 'https://i.ibb.co/8BrZ57H/7.png'
	},
	{
		title: '8th',
		tags: ['8th', 'eigtht', '8', 'eigth'],
		img: 'https://i.ibb.co/BfR3KC5/8.png'
	},
	{
		title: 'Final',
		tags: ['final', 'total', 'last', '9th', 'ninth', '9', 'nine'],
		img: 'https://i.ibb.co/3fM0NTv/Final.png'
	}
]

function semesterOptionGenerator(semesterCodes: FixedLengthArray<string, 9>): FormOptions[] {
	return semesterCodes.map((code, index) => ({
		title: numberWithTags[index].title + " Semester",
		tags: numberWithTags[index].tags,
		img: numberWithTags[index].img,
		value: code
	}));
}

export const courseList: CourseList = [
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
				title: "Semester",
				options: semesterOptionGenerator([
					'5611', '5612', '5613', '5614',
					'5615', '5616', '5617', '5618',
					'5610'
				])
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
				title: "Semester",
				options: semesterOptionGenerator([
					'5601', '5602', '5603', '5604',
					'5605', '5606', '5607', '5608',
					'5600'
				])
			},
			{
				field: "exam_year",
				title: "Exam Year (According to Admit card)"
			}
		],
	}
]

export const rootUrl = "http://www.nu.ac.bd/results/";
