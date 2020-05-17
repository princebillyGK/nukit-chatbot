import { Database } from '../lib/Database';
import { DBCONFIGS } from '../config/config';
import { Note as NoteInterface} from '../types/types'

const db = new Database(DBCONFIGS.primarydb);

export class Note {
    static addEntry(note: NoteInterface, verificationToken?: string): number{
        db.connect();
        //insert note entry
        const insertNoteStmt = `INSERT INTO note
        (subjectCode, title, description, uploaderEmail, driveURL, driveID, uploadTime, verified)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
        db.execute(insertNoteStmt, [
            note.subjectCode,
            note.title,
            note.description,
            note.uploaderEmail,
            note.driveURL,
            note.driveID,
            note.uploadTime,
            verificationToken ? "0" : "1"
        ]);

        //get ID of inserted row
        const getIDStmt = "select max(id) from note";
        const noteID = db.executeQuery(getIDStmt).getInt(0);
        console.log("noteID: " + noteID);

        if (verificationToken) {
            //add verfication Info
            const insertVerfStmt = `INSERT INTO noteVerification
            (verificationToken, noteId)
            VALUES(?, ?);`
            db.execute(insertVerfStmt, [verificationToken, noteID]);
        }

        return noteID;
    }
}