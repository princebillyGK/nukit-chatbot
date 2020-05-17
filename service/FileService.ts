
export class FileService {

    public readonly file: GoogleAppsScript.Drive.File;

    constructor(id: string) {
        this.file = DriveApp.getFileById(id);
    }

    public static getIdfromUrl(url: string): string {
        return url.match(/[-\w]{25,}/)![0];
    }

    public getSize(): string {
        let bytes = this.file.getSize();
        const thresh = 1024;

        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }

        var units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1) + ' ' + units[u];
    }
    


}