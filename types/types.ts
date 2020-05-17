export interface DatabaseConfiguration {
    username: string,
    password: string,
    jdbcString: string,
}

export interface DatabaseConfigurations {
 [key: string]: DatabaseConfiguration;
}

export interface GoogleServiceConfig{
    [key: string]: {
        [key: string]: string
    }
}

//Models
// Notes
export interface Note{
    subjectCode: number,
    title: string,
    description: string,
    uploaderEmail: string,
    driveURL: string,
    driveID: string
    uploadTime: string,
    verified?: boolean
}

export interface NoteVerficationEmailOption {
    title: string,
    subject: string,
    description: string,
    uploaderEmail: string,
    uploadTime: string,
    fileName: string,
    fileSize: string,
    driveURL: string,
    approveURL: string,
    rejectURL: string
}
//Notes return type

