/** verifies files **/
function doGet(e) {
    const response = HtmlService.createTemplateFromFile('../template/verificationResponse.html');
    response.data.type='approve';
    return response.evaluate();
}