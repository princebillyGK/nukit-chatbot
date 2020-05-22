import { VERFICATIONRESPONSEDATA } from '../data/verificationResponse.data'
import { VerficationResponseData, NoteVerification } from '../types/types';
import { DateUtil } from '../lib/util';
import Note from '../models/Note'
import NoteController from '../controller/NoteController';

/** verifies files **/
function doGet(e: any) { // eslint-disable-line no-unused-vars
    const { v: verficationToken, nid: id, action } = e.parameter;
    if ( // check if parmater is missing or invalid
        verficationToken === undefined
        || id === undefined
        || (
            action !== 'approve'
            && action !== 'reject'
        )
    ) {
        return createVerificationResponse(VERFICATIONRESPONSEDATA.invalidLink());
    }

    const note = new NoteController(id);
    let vinfo: NoteVerification;

    try {
        vinfo = Note.getVerificationInfo(id);
    } catch {
        return createVerificationResponse(VERFICATIONRESPONSEDATA.noteNotFound(id));
    }

    if (vinfo.verificationToken === null) {
        createVerificationResponse(
            VERFICATIONRESPONSEDATA.expiredToken(
                DateUtil.convertMysqlDateTimetoDate(vinfo.verificationTime).toString())
        );
    }

    if (verficationToken !== vinfo.verificationToken) { //if token wrong
        return createVerificationResponse(VERFICATIONRESPONSEDATA.invalidToken());
    }

    const noteData = Note.getInfo(id);

    if (action == 'approve') { //verification approved
        note.approveSubmission();
        sendConfirmationEmail(noteData.uploaderEmail, {
            isApproved: true,
            fileTitle: noteData.title,
            fileDescription: noteData.description,
            previewLink: noteData.driveURL
        });
        createVerificationResponse(VERFICATIONRESPONSEDATA.appoved(note.id, vinfo.verificationToken));
    } else { //verification rejected
        note.rejectSubmission();
        sendConfirmationEmail(noteData.uploaderEmail, {
            isApproved: false,
            fileTitle: noteData.title,
            fileDescription: noteData.description,
        });
        createVerificationResponse(VERFICATIONRESPONSEDATA.appoved(note.id, vinfo.verificationToken));
    }
}

function sendConfirmationEmail(recipent: string, data: { isApproved: boolean, fileTitle: string, fileDescription: string, previewLink?: string }) {
    const templateEmail = HtmlService.createTemplateFromFile('email/fileConfirmation.html');
    templateEmail.data = data;
    const emailBody = templateEmail.evaluate().getContent();
    GmailApp.sendEmail(
        recipent,
        data.isApproved ? "NUKIT - file has been accepted" : "NUKIT - file has been rejected",
        emailBody
    );
}

function createVerificationResponse(data: VerficationResponseData) {
    const response = HtmlService.createTemplateFromFile('template/verificationResponse.html');
    response.data = data;
    const html = response.evaluate()
    html.addMetaTag('viewport', 'width=device-width, initial-scale=1');
    return html;
}



