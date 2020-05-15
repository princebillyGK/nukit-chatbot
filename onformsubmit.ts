// const MONGO_ADD_FILE_UPLOAD_API_URL = "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nukitwebhook-pxfhy/service/nukit-http/incoming_webhook/file";
// const MONGO_SECRET = "RLTGUXAUcMIfuG2Cads=";
// const VERIFICATIONHOSTLINK = "https://script.google.com/macros/s/AKfycbwQxQJlu--vxTIInK1tj9HLuARdH7Yk2VNMKPkUb-Y/dev";

// function onSpreadsheetSubmit(e) {
//      const {
//        "namedValues": {
//        "Timestamp": [rawtimestamp],
//        "Select Subject": [course],
//        "Email Address": [uploaderEmail], //email address of uploader
//        "Upload File (PDF)": [fileUrl],
//        "Title": [fileTitle],
//        "Short Description": [fileDescription]
//        }
//      } = e;
     
//      //get Subject id
//      const subjectId = course.match(/\(([^)]+)\)/)[1];
//      //timestamp
//      const timestamp = new Date(rawtimestamp)
//      const timestring = timestamp.toString();
     
//      //file operation
//      const fileIdinGoogleDrive = getFileIdfromUrl(fileUrl)
//      const uploadedFile = DriveApp.getFileById(fileIdinGoogleDrive)
//      const fileSize = convertToReadableFileSize(uploadedFile.getSize());
//      const verificationToken = Utilities.getUuid();
     
     
//      //set approve and review url
//      const approveUrl = `${VERIFICATIONHOSTLINK}?v=${verificationToken}&f=${fileIdinGoogleDrive}&action=approve`;
//      const rejectUrl = `${VERIFICATIONHOSTLINK}?v=${verificationToken}&f=${fileIdinGoogleDrive}&action=reject`;
     
//      //Mongo Fetch Upload Request
//         const fetchData = {
//           '_id': fileIdinGoogleDrive,
//           timestamp,
//           'subjectId': parseInt(subjectId),
//           'title': fileTitle,
//           'description': fileDescription,
//           'uploaderEmail': uploaderEmail,
//           'verified': false,
//           verificationToken
//         };
//         var fetchOptions = {
//           'method' : 'post',
//             'contentType': 'application/json',
//           'payload' : JSON.stringify(fetchData)
//         };
//      Logger.log(fetchOptions);
     
//      try {
//      //fetch mongo
//      UrlFetchApp.fetch(`${MONGO_ADD_FILE_UPLOAD_API_URL}?secret=${MONGO_SECRET}`, fetchOptions);
//      //email
//      const email = `<!DOCTYPE html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <title> </title> <!--[if !mso]><!-- --> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!--<![endif]--> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> #outlook a { padding:0; } .ReadMsgBody { width:100%; } .ExternalClass { width:100%; } .ExternalClass * { line-height:100%; } body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; } table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; } img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; } p { display:block;margin:13px 0; } </style> <!--[if !mso]><!--> <style type="text/css"> @media only screen and (max-width:480px) { @-ms-viewport { width:320px; } @viewport { width:320px; } } </style> <!--<![endif]--> <!--[if mso]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> <![endif]--> <!--[if lte mso 11]> <style type="text/css"> .outlook-group-fix { width:100% !important; } </style> <![endif]--> <!--[if !mso]><!--> <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,700" rel="stylesheet" type="text/css"> <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"> <style type="text/css"> @import url(https://fonts.googleapis.com/css?family=Ubuntu:400,700); @import url(https://fonts.googleapis.com/css?family=Cabin:400,700); </style> <!--<![endif]--> <style type="text/css"> @media only screen and (min-width:480px) { .mj-column-per-100 { width:100% !important; max-width: 100%; } .mj-column-per-50 { width:50% !important; max-width: 50%; } } </style> <style type="text/css"> @media only screen and (max-width:480px) { table.full-width-mobile { width: 100% !important; } td.full-width-mobile { width: auto !important; } } </style> <style type="text/css">.hide_on_mobile { display: none !important;} @media only screen and (min-width: 480px) { .hide_on_mobile { display: block !important;} } .hide_section_on_mobile { display: none !important;} @media only screen and (min-width: 480px) { .hide_section_on_mobile { display: table !important;} } .hide_on_desktop { display: block !important;} @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} } .hide_section_on_desktop { display: table !important;} @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} } [owa] .mj-column-per-100 { width: 100%!important; } [owa] .mj-column-per-50 { width: 50%!important; } [owa] .mj-column-per-33 { width: 33.333333333333336%!important; } p { margin: 0px; } @media only print and (min-width:480px) { .mj-column-per-100 { width:100%!important; } .mj-column-per-40 { width:40%!important; } .mj-column-per-60 { width:60%!important; } .mj-column-per-50 { width: 50%!important; } mj-column-per-33 { width: 33.333333333333336%!important; } } </style> </head> <body style="background-color:#FFFFFF;"> <div style="background-color:#FFFFFF;"> <!--[if mso | IE]> <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:635px;" width="635" > <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--> <div style="Margin:0px auto;max-width:635px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="" style="vertical-align:top;width:635px;" > <![endif]--> <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:133px;"> <img height="auto" src="https://i.ibb.co/8YKbGTk/image.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="133"> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="left" style="background:transparent;font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;"> <div style="font-family:Ubuntu, sans-serif;font-size:11px;line-height:1.2;text-align:left;color:#000000;"> <p style="text-align: center;"><span style="font-size: 24px;"><span style="color: #b96ad9;">&#x1F4C1;&#xA0;</span> File Verification Request</span></p> </div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:635px;" width="635" > <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--> <div style="Margin:0px auto;max-width:635px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="" style="vertical-align:top;width:317.5px;" > <![endif]--> <div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;"> <p><span style="color: #95a5a6;"><strong>&#x2709;&#xFE0F; ${uploaderEmail} </strong></span></p> <h2 style="text-align: justify; line-height: 100%;"><span style="color: #236fa1;"><strong>${fileTitle} </strong></span></h2> <div style="text-align: justify;"><span style="font-size: 12px;"><b>Subject: ${course}</b></span></div> <div style="text-align: justify;"><span style="font-size: 12px;">${fileDescription} </span></div> <div style="text-align: left;"><span style="color: #444; font-size: 8px;"><small>Time: ${timestring}</small> </span></div> </div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> <td class="" style="vertical-align:top;width:317.5px;" > <![endif]--> <div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td style="font-size:0px;word-break:break-word;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td height="30" style="vertical-align:top;height:30px;"> <![endif]--> <div style="height:30px;"> &#xA0; </div> <!--[if mso | IE]> </td> </tr> </table> <![endif]--> </td> </tr> <tr> <td align="center" vertical-align="middle" style="font-size:0px;padding:20px 20px 20px 20px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"> <tbody> <tr> <td align="center" bgcolor="#3446E8" role="presentation" style="border:0px solid #000;border-radius:0px;cursor:auto;mso-padding-alt:22px 66px 22px 66px;background:#3446E8;" valign="middle"> <a href="${fileUrl}" style="display:inline-block;background:#3446E8;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:33px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:22px 66px 22px 66px;mso-padding-alt:0px;border-radius:0px;" target="_blank"> <div>View</div> </a> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;"> <p style="text-align: center;"><strong><span style="color: #3598db;">File size:&#xA0; ${fileSize}&#xA0;</span></strong></p> </div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:635px;" width="635" > <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--> <div style="Margin:0px auto;max-width:635px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="" style="vertical-align:top;width:317.5px;" > <![endif]--> <div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" vertical-align="middle" style="font-size:0px;padding:20px 20px 20px 20px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"> <tbody> <tr> <td align="center" bgcolor="#008836" role="presentation" style="border:0px solid #000;border-radius:24px;cursor:auto;mso-padding-alt:14px 40px 14px 40px;background:#008836;" valign="middle"> <a href="${approveUrl}" style="display:inline-block;background:#008836;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:20px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:14px 40px 14px 40px;mso-padding-alt:0px;border-radius:24px;" target="_blank"> <div>Approve</div> </a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> <td class="" style="vertical-align:top;width:317.5px;" > <![endif]--> <div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" vertical-align="middle" style="font-size:0px;padding:20px 20px 20px 20px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"> <tbody> <tr> <td align="center" bgcolor="#e85034" role="presentation" style="border:0px solid #000;border-radius:24px;cursor:auto;mso-padding-alt:13px 38px 13px 38px;background:#e85034;" valign="middle"> <a href="${rejectUrl}" style="display:inline-block;background:#e85034;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:19px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:13px 38px 13px 38px;mso-padding-alt:0px;border-radius:24px;" target="_blank"> <div>Reject</div> </a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> </table> <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:635px;" width="635" > <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--> <div style="Margin:0px auto;max-width:635px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;"> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="" style="vertical-align:top;width:635px;" > <![endif]--> <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.2;text-align:left;color:#000000;"> <div style="text-align: center;"><span style="color: #e67e23;">Reply only when you want to tell something else to the uploader. The accept and reject operation will automatically notify the uploader</span></div> </div> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> </div> <!--[if mso | IE]> </td> </tr> </table> <![endif]--> </div> </body> </html>` 
//      GmailApp.sendEmail("support@princebillygk.freshdesk.com", "NUKIT file upload", '', {htmlBody: email, replyTo: uploaderEmail});
//      } catch(e) {
//        Logger.log(e)
//      }
//  }
 
// // mongodb functions -------------------
 
 
// // file functions ----------------------
//  function getFileIdfromUrl(url) {
//    return url.match(/[-\w]{25,}/)[0];
//  }
 
//  function convertToReadableFileSize(bytes, si) {
//     var thresh = si ? 1000 : 1024;
//     if(Math.abs(bytes) < thresh) {
//         return bytes + ' B';
//     }
//     var units = si
//         ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
//         : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
//     var u = -1;
//     do {
//         bytes /= thresh;
//         ++u;
//     } while(Math.abs(bytes) >= thresh && u < units.length - 1);
//     return bytes.toFixed(1)+' '+units[u];
// }
 
//  // test -------------------------
 
//  function test() {
//    const response = {
//    "authMode":"FULL",
//    "namedValues": {
//      "Short Description":["sdfasdfasdfaddsfsdfwdfwdsfweewefsdfwdwdfsdfsdfsdfw"],
//      "Timestamp":["5/11/2020 14:38:06"],
//      "Select Subject":["Computer Networking (530221)"],
//      "Email Address":["princebillyGK@gmail.com"],
//      "Upload File (PDF)":["https://drive.google.com/open?id=19HSszBm3echqkIgFT8PVTcqQoqyshm0f"],
//      "Email to get notification":[""],
//      "Title":["dfsfdsdfsdfsfsdfsfsdfsdafsdfswfsdfsdf"]},
//      "range":{"columnEnd":6,"columnStart":1,"rowEnd":5,"rowStart":5},
//      "source":{},
//      "triggerUid":"3848987",
//      "values":[
//        "5/11/2020 14:38:06",
//        "Computer Networking (530221)"
//        ,"https://drive.google.com/open?id=19HSszBm3echqkIgFT8PVTcqQoqyshm0f",
//        "dfsfdsdfsdfsfsdfsfsdfsdafsdfswfsdfsdf",
//        "sdfasdfasdfaddsfsdfwdfwdsfweewefsdfwdwdfsdfsdfsdfw",
//        "princebillyGK@gmail.com",""
       
//       ]
//    }
//    onSpreadsheetSubmit(response);   
//  }
 
 

