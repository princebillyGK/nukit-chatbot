import {toTitleCase} from '../lib/utill'
import { ResultParserSuccessOutput } from '../types/common'


export function resultTextOutput(result: ResultParserSuccessOutput) {
    let msg = `*${result.title}*\n`
        + `\*${toTitleCase(result.student)}*\n`
        + `*Student type:* ${result.studentType}\n`
        + `*CGPA:* \`${result.cgpa}\`\n`;
    msg+= `*Subjectwise grades:*\n`
    for (let key in result.grades) {
        msg += `${toTitleCase(key)}: \`${result.grades[key]}\`\n`;
    }
    return msg;
}