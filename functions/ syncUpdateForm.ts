import { GOOGLESERVICESINFO } from '../config/config';
import { FormService } from '../service/FormService'
import { Subject } from '../models/Subject'

function syncUpdateForm() {
    // Logger.log(subjects);
    const uploadForm = new FormService(GOOGLESERVICESINFO.notesuploadForm.id);
    const selectListId: number = 1253244219;
    uploadForm.setSelectList(selectListId, Subject.getStringAll());
}