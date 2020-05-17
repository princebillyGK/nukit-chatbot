import {Database} from '../lib/Database';
import {DBCONFIGS} from '../config/config';

const db = new Database(DBCONFIGS.primarydb);
export class Subject {
    static getStringAll(): string[] {
        db.connect();
        const result = db.executeQuery("SELECT * FROM subject order by title");
        const titleColumn = result.findColumn('title');
        const codeColumn = result.findColumn('code');
        Logger.log(titleColumn);
        let subjects = [];
        while (result.next()) {
            subjects.push(`${result.getString(codeColumn)} - ${result.getString(titleColumn)}`);
        }
        return subjects;
    }
}