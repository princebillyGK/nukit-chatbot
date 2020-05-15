class FormController {
    readonly form: GoogleAppsScript.Forms.Form;

    constructor(id) {
        this.form = FormApp.openById(id);
    }

    public setSelectList(id:number) {
        const item:GoogleAppsScript.Forms.Item = this.form.getItemById(id);
    }

    public logItems() {
        this.form.getItems().map(item => {
            console.log(`Title: ${item.getTitle()} Id: ${item.getId}`);
        })
    }
}