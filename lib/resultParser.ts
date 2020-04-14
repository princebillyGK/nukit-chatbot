import cheerio from 'cheerio';
import {ResultParserOutput} from '../types/common';

//cse
export function parser1(html:string):ResultParserOutput{
    const $ = cheerio.load(html, { xmlMode: true });

    if ($('table:first-child>tr').text().trim().match(/(\w)*Error! Wrong Registration Number(\w)*/i)) {
        return false;
    }

    let title = $('table:first-child tr:nth-child(3) strong').text().trim();
    let student = $('table:nth-child(2) tr:first-child b').text();
    let studentType = $('table:nth-child(2) tr:nth-child(6) td:nth-child(2)').first().text();
    let cgpa = $('table:nth-child(2) tr:nth-child(7) td:nth-child(2)>:not(font)').text();
    let grades = {};
    let start = 3;
    let temp;
    while ((temp = $(`table:nth-child(2) tr:nth-child(${start}) td:nth-child(2)>font`).text()) != "") {
        grades[temp] = $(`table:nth-child(2) tr:nth-child(${start}) td:nth-child(4)>font`).text().trim();
        ++start;
    }
    return { title, student, studentType, cgpa, grades };
}

//bba
export function parser2(html:string):ResultParserOutput {
    const $ = cheerio.load(html, { xmlMode: true });

    if ($('table:first-child>tr').text().trim().match(/(\w)*Registration No. does't match(\w)*/i)) {
        return false;
    }

    let title = $('table:nth-child(1) tr:nth-child(3) font').first().text().trim();
    let student = $('table:nth-child(2) tr:first-child td> b').text();
    let studentType = $('table:nth-child(2) tr:nth-child(5) td:nth-child(2)').first().text();
    let cgpa= $('table:nth-child(2) tr:nth-child(6) td:nth-child(2)').first().text();
    let grades = {};

    let start = 3;
    let temp;
    while ((temp = $(`table:nth-child(2) tr:nth-child(${start}) td:nth-child(2)>font`).text()) != "") {
        grades[temp] = $(`table:nth-child(2) tr:nth-child(${start}) td:nth-child(3)`).text().trim();
        ++start;
    }

    return { title, student, studentType, cgpa, grades };
}