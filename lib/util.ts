module DateUtil {
    export function convertDateToMysqlDateTime(date: Date): string {
        const mysqlDateTime = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
        return mysqlDateTime;
    }

    export function convertMysqlDateTimetoDate(datetime: string): Date {
        const t = datetime.split(/[- :]/).map(parts => parseInt(parts));
        return new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
    }
}

export { DateUtil };