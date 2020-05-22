import { Database } from '../lib/Database'
import { DBCONFIGS } from '../config/config';
import { DateUtil } from '../lib/util';
import { Note as NoteInterface, NoteVerification } from '../types/types'

const db = new Database(DBCONFIGS.primarydb);
module Note {
    export enum Status {
        'pending',
        'verified',
        'rejected'
    }

    export function addEntry(note: NoteInterface, verificationToken?: string): number {
        db.connect();
        //insert note entry
        const insertNoteStmt = `INSERT INTO note
        (subjectCode, title, description, uploaderEmail, driveURL, driveID, uploadTime, status)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
        db.execute(insertNoteStmt, [
            note.subjectCode,
            note.title,
            note.description,
            note.uploaderEmail,
            note.driveURL,
            note.driveID,
            note.uploadTime,
            verificationToken ? "pending" : "verfied"
        ]);

        //get ID of inserted row
        const getIDStmt = "select max(id) from note";
        const noteIDResponse = db.executeQuery(getIDStmt);
        noteIDResponse.next();
        const noteID = noteIDResponse.getInt(1);

        if (verificationToken) {
            //add verfication Info
            const insertVerfStmt = `INSERT INTO noteVerification
            (verificationToken, noteId)
            VALUES(?, ?);`
            db.execute(insertVerfStmt, [verificationToken, noteID]);
        }
        return noteID;
    }


    export function getInfo(id: string): NoteInterface {
        const getDriveIdofFileStmt = "SELECT * from note where id= ?";
        db.connect();
        const result = db.executeQuery(getDriveIdofFileStmt, [id]);
        if (!result.next()) {
            throw new Error("Not Found");
        }
        const data = {
            subjectCode: parseInt(result.getString('subjectCode')),
            title: result.getString('title'),
            description: result.getString('description'),
            uploaderEmail: result.getString('uploaderEmail'),
            driveURL: result.getString('driveUrl'),
            driveID: result.getString('driveID'),
            uploadTime: result.getString('uploadTime'),
            status: result.getString('status')
        }
        db.disconnect();
        return data;
    }

    export function getVerificationInfo(id: string): NoteVerification {
        db.connect();
        const getVerficationStmt: string = "SELECT * FROM noteVerification where noteId = ?";
        const result = db.executeQuery(getVerficationStmt, [id]);
        if (!result.next()) {
            db.disconnect();
            throw new Error("Not found");
        }

        const verificationInfo = {
            verificationToken: result.getString('verificationToken'),
            verificationTime: result.getString('verificationTime')
        }
        db.disconnect();
        return verificationInfo;
    }

    export function setStatus(id: string, status: Status) {
        const setVerifiedStmt = `UPDATE note SET status = ? where id =?`
        db.connect();
        db.execute(setVerifiedStmt, [Status[status], id]);
        db.disconnect();
    }

    export function deleteNote(id: string) {
        const deleteNoteStmt = 'DELETE FROM note WHERE id =  ?';
        db.connect();
        db.execute(deleteNoteStmt, [id]);
        db.disconnect();
    }


    export function setVerfication(id: string) {
        const verficationStmt =
            `update noteVerification set verificationToken = null,
             verificationTime = 
             "${DateUtil.convertDateToMysqlDateTime(new Date())}"
             where NoteId = ?`
        db.connect();
        db.execute(verficationStmt, [id]);
        db.disconnect()
    }
}

export default Note;