import { Database } from '../lib/Database'
import { DATABASECONFIG } from '../config/config';

function testDatabase() {
    const db = new Database(DATABASECONFIG);
    db.connect();
    Logger.log(db.executeQuery("SELECT * FROM subject"));
}
