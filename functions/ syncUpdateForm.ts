import { Database } from '../lib/Database'
import { DBCONFIGS } from '../config/config';
import { FormController } from '../controller/FormController'
const properties = PropertiesService.getScriptProperties();

function syncUpdateForm() {
    const db = new Database(DBCONFIGS.primarydb);
    db.connect();
    const result = db.executeQuery("SELECT * FROM subject order by title");
    const titleColumn = result.findColumn('title');
    const codeColumn = result.findColumn('code');
    Logger.log(titleColumn);
    let subjects = [];
    while (result.next()) {
        subjects.push(`${result.getString(codeColumn)} - ${result.getString(titleColumn)}`);
    }
    // Logger.log(subjects);
    const uploadForm = new FormController(properties.getProperty('UPLOADFORMID') as string);
    const selectListId:number = 1253244219;
    // uploadForm.logItems();
    uploadForm.setSelectList(selectListId, subjects);
}