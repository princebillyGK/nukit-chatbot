const MONGO_VERIFICATION_LINK_URL = "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nukitwebhook-pxfhy/service/nukit-http/incoming_webhook/verification";
//const MONGO_SECRET = "RLTGUXAUcMIfuG2Cads=";

function doGet(e) {
  let output;
  const {v:verificationToken, f:fileId, action} = e.parameter;
  
  if(verificationToken && fileId && (action == 'approve' || action == 'reject')){
    output = `v=${verificationToken} f=${fileId}, action=${action}`
    
    //mongo fetch
    const fetchBody = {
      _id: fileId,
      verificationToken, 
      action
    };
    var fetchOptions = {
      'method' : 'patch',
      'contentType': 'application/json',
      'payload' : JSON.stringify(fetchBody),
    };
    
      const result = UrlFetchApp.fetch(`${MONGO_VERIFICATION_LINK_URL}?secret=${MONGO_SECRET}`, fetchOptions);
      output = JSON.stringify(result.getContentText());

  } else {
     output = `<h3 class="text-center text-warning">Invalid verification link</h3>`;
  }
  
  //response with html
  const html = `<!DOCTYPE html> <html> <head> <base target="_top"/><meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"> <title>Nukit Verification</title> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css"> <style> .brands a{display:block;text-align:center;padding:40px 0}.brands a img{display:inline-block;margin:10px 20px;vertical-align:middle}#logoimageonphone{width:80px;position:absolute}@media (min-width:768px){#logoimage{width:100px}.navigationitemsleft{margin-right:40px;font-size:18px}.navigationitemsright{margin-left:40px;font-size:18px}#logoimageonphone{display:none}}@media (max-width:575px){#logoimageonphone{margin-left:43%}}@media (min-width:575px){#logoimageonphone{margin-left:45%}}@media (max-width:767px){.brands a{padding:30px 0}#logoimage{display:none}.navigationitemsleft,.navigationitemsright{margin-top:10px}}.brands{color:#313437;background-color:#fff;position:fixed;bottom:0;width:100%} </style> </head> <body style="background-color: #ffffff;"> <div class="container"> <div></div> <h1 class="text-center"><img src="https://i.ibb.co/8YKbGTk/image.png" width="100" style="padding-top: 33px;"></h1>${output}</div> <div class="brands" style="background-color: rgb(232,232,232);"><a  style="padding: 5;padding-bottom: 23px;padding-top: 19px;margin-top: 20px;"> <img src="https://leadsbridge.com/wp-content/themes/leadsbridge/img/integration-lg-logos/logo294.png" height="30" loading="lazy" width="30"><img src="https://xiphoswebmarketing.com/wp-content/uploads/2016/04/256px-Google_22G22_Logo.svg_.png" width="30" height="30" loading="lazy"><img src="https://www.macizotech.com/wp-content/uploads/2017/07/mongodb-logo.png" width="30" loading="lazy"></a></div> <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script> </body></html>`
  const template =HtmlService.createHtmlOutput(html);
  template.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return template;
}
