export interface DatabaseConfiguration {
    username: string,
    password: string,
    jdbcString: string,
}

export interface DatabaseConfigurations {
    [key: string]: DatabaseConfiguration;
}

export interface GoogleServiceConfig {
    [key: string]: {
        [key: string]: string
    }
}

//Models
// Notes
export interface Note {
    id?: string,
    subjectCode: number,
    title: string,
    description: string,
    uploaderEmail: string,
    driveURL: string,
    driveID: string
    uploadTime: string,
    verified?: boolean
}

//Note Verfication 
export interface NoteVerification {
    verificationToken: string, 
    verificationTime: string
}

//email
export interface fileConfirmationEmaildata {
    isApproved: boolean,
    fileTitle: string,
    fileDescription: string,
    previewLink: string
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

//response 
export interface VerficationResponseDataSet {
    [key: string]: VerficationResponseDataGenerator
}

export interface VerficationResponseDataGenerator {
    (...a: any[]): VerficationResponseData
}

export interface VerficationResponseData {
    title: string,
    icon: string,
    color: string,
    primaryText: string,
    secondaryText: string
}

