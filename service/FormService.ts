export class FormService {
    readonly form: GoogleAppsScript.Forms.Form;

    constructor(id:string) {
        this.form = FormApp.openById(id);
    }

    public setSelectList(id:number, values:string[]) {
        const selectList :GoogleAppsScript.Forms.ListItem = this.form.getItemById(id).asListItem();
        selectList.setChoiceValues(values);
    }

    public logItems() {
        this.form.getItems().map(item => {
            console.log(`Title: ${item.getTitle()} Id: ${item.getId()}`);
        })
    }
}