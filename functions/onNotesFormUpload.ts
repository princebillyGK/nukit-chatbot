import { WEBAPPURL } from '../config/config';
import { FileService } from '../service/FileService';
import { Note } from '../models/Notes';
import {noteVerficationEmail} from '../email/noteVerificationEmail'

const VERFICATIONURL = WEBAPPURL.dev;

function onNotesFormUpload(e: any) {

  //Extracting Form upload response
  const {
    "namedValues": {
      "Timestamp": [timestamp],
      "Select Subject": [subject],
      "Email Address": [uploaderEmail], //email address of uploader
      "Upload File (PDF)": [driveURL],
      "Title": [title],
      "Short Description": [description]
    }
  } = e;

  const subjectCode = subject.match(/\d+/)[0];
  const uploadTime = new Date(timestamp).toString();

  const driveID = FileService.getIdfromUrl(driveURL)
  const uploadedFile = new FileService(driveID);
  const fileName = uploadedFile.file.getName();
  const fileSize = uploadedFile.getSize();
  const verificationToken = Utilities.getUuid();

  //set approve and review url

  try {
    const noteID= Note.addEntry({
      subjectCode,
      title,
      description,
      uploaderEmail,
      driveURL,
      driveID,
      uploadTime
    }, verificationToken);

    //email
    const approveURL = `${VERFICATIONURL}?v=${verificationToken}&nid=${noteID}&action=approve`;
    const rejectURL = `${VERFICATIONURL}?v=${verificationToken}&nid=${noteID}&action=reject`;
    const verficationEmailText =  noteVerficationEmail({
      title,
      subject,
      description,
      uploadTime,
      uploaderEmail,
      fileName,
      fileSize,
      driveURL,
      approveURL,
      rejectURL
    });
    GmailApp.sendEmail("support@princebillygk.freshdesk.com", "NUKIT file upload", '', { htmlBody: verficationEmailText, replyTo: uploaderEmail });

  } catch (e) {
    Logger.log(e)
  }
}


function testOnNotesFormUpload() {
  const response = {
    "authMode": "FULL",
    "namedValues": {
      "Short Description": ["sdfasdfasdfaddsfsdfwdfwdsfweewefsdfwdwdfsdfsdfsdfw"],
      "Timestamp": ["5/11/2020 14:38:06"],
      "Select Subject": ["Computer Networking (530221)"],
      "Email Address": ["princebillyGK@gmail.com"],
      "Upload File (PDF)": ["https://drive.google.com/open?id=19HSszBm3echqkIgFT8PVTcqQoqyshm0f"],
      "Email to get notification": [""],
      "Title": ["dfsfdsdfsdfsfsdfsfsdfsdafsdfswfsdfsdf"]
    },
    "range": { "columnEnd": 6, "columnStart": 1, "rowEnd": 5, "rowStart": 5 },
    "source": {},
    "triggerUid": "3848987",
    "values": [
      "5/11/2020 14:38:06",
      "530221 - Computer Networking"
      , "https://drive.google.com/open?id=19HSszBm3echqkIgFT8PVTcqQoqyshm0f",
      "dfsfdsdfsdfsfsdfsfsdfsdafsdfswfsdfsdf",
      "sdfasdfasdfaddsfsdfwdfwdsfweewefsdfwdwdfsdfsdfsdfw",
      "princebillyGK@gmail.com", ""

    ]
  }
  onNotesFormUpload(response);
}



