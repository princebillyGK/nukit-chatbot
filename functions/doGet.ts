import { VERFICATIONRESPONSEDATA } from '../data/verificationResponse.data'
import { VerficationResponseData, NoteVerification } from '../types/types';
import { DateUtil } from '../lib/util';
import Note from '../models/Note'
import NoteController from '../controller/NoteController';
import { SUPPORTEMAIL } from '../config/config'

/** verifies files **/
function doGet(e: any) { // eslint-disable-line no-unused-vars
    const { v: verificationToken, nid: id, action } = e.parameter;
    if ( // check if parmater is missing or invalid
        verificationToken === undefined
        || id === undefined
        || (
            action !== 'approve'
            && action !== 'reject'
        )
    ) {
        return createVerificationResponse(VERFICATIONRESPONSEDATA.invalidLink());
    }


    let vinfo: NoteVerification;
    try {
        vinfo = Note.getVerificationInfo(id);
    } catch (e) {
        if (e.name === "NotFoundError") {
            return createVerificationResponse(VERFICATIONRESPONSEDATA.noteNotFound(id));
        }
        throw e;
    }

    if (vinfo.verificationToken === null) {
        return createVerificationResponse(
            VERFICATIONRESPONSEDATA.expiredToken(
                DateUtil.convertMysqlDateTimetoDate(vinfo.verificationTime).toString())
        );
    }

    if (verificationToken !== vinfo.verificationToken) { //if token wrong
        return createVerificationResponse(VERFICATIONRESPONSEDATA.invalidToken());
    }

    const noteData = Note.getInfo(id);
    const note = new NoteController(id);

    if (action == 'approve') { //verification approved
        note.approveSubmission();
        sendConfirmationEmail(noteData.uploaderEmail, {
            isApproved: true,
            fileTitle: noteData.title,
            fileDescription: noteData.description,
            previewLink: noteData.driveURL
        });
        return createVerificationResponse(VERFICATIONRESPONSEDATA.approved(note.id, vinfo.verificationToken));
    } else { //verification rejected
        note.rejectSubmission();
        sendConfirmationEmail(noteData.uploaderEmail, {
            isApproved: false,
            fileTitle: noteData.title,
            fileDescription: noteData.description,
        });
        return createVerificationResponse(VERFICATIONRESPONSEDATA.rejected(note.id, vinfo.verificationToken));
    }
}

function sendConfirmationEmail(recipent: string, data: { isApproved: boolean, fileTitle: string, fileDescription: string, previewLink?: string }) {
    const templateEmail = HtmlService.createTemplateFromFile('email/fileConfirmation.html');
    templateEmail.data = data; 
    const emailBody = templateEmail.evaluate().getContent();
    GmailApp.sendEmail(
        recipent,
        data.isApproved ? "NUKIT - file has been accepted" : "NUKIT - file has been rejected",
        '',
        { htmlBody: emailBody, replyTo: SUPPORTEMAIL }
    );
}

function createVerificationResponse(data: VerficationResponseData) {
    const response = HtmlService.createTemplateFromFile('template/verificationResponse.html');
    response.data = data;
    const html = response.evaluate()
    html.addMetaTag('viewport', 'width=device-width, initial-scale=1');
    return html;
}

function testDoget() { // eslint-disable-line no-unused-vars
    var eventObject = 
      {
        "parameter": {
          "v": "febe4933-a898-4e73-bcec-5f5dbb9f1c2a",
          "nid": "34",
          "action": "reject"
        },
        "contextPath": "",
        "contentLength": -1,
        "queryString": "v=febe4933-a898-4e73-bcec-5f5dbb9f1c2a&nid=34&action=reject",
        "parameters": {
          "action": ["view"],
          "page": ["3"]
        }
      }
    doGet(eventObject);
  }