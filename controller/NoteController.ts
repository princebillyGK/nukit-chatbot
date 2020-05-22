import Note from '../models/Note'
export default class NoteController {
    public readonly id: string;
    constructor(id: string) {
        this.id = id;
    }

    public removeFile() {
        Drive.Files?.remove(Note.getInfo(this.id).driveID);
    }

    public rejectSubmission() {
        Note.setStatus(this.id, Note.Status.rejected); 
        this.removeFile();
        Note.setVerfication(this.id);
    }

    public approveSubmission() {
        Note.setStatus(this.id, Note.Status.verified);
        Note.setVerfication(this.id);
    }

}