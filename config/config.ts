import { DatabaseConfigurations, GoogleServiceConfig } from "../types/types";
const properties = PropertiesService.getScriptProperties();

const DBCONFIGS: DatabaseConfigurations = {
    primarydb: {
        username: properties.getProperty('DBUSERNAME') as string,
        password: properties.getProperty('DBPASSWORD') as string,
        jdbcString: properties.getProperty('DBCONNECTIONURL') as string
    }
}
const GOOGLESERVICESINFO: GoogleServiceConfig = {
    /**
     * Notes upload form
     */
    notesuploadForm: {
        id: properties.getProperty('NOTESUPLOADFORMID') as string
    }
}

const WEBAPPURL = {
    dev: properties.getProperty('WEBAPPDEVLINK') as string,
    production: properties.getProperty('WEBAPPPRODUCTIONLINK') as string
}

const SUPPORTEMAIL = properties.getProperty('SUPPORTEMAIL') as string


export { DBCONFIGS, GOOGLESERVICESINFO, WEBAPPURL, SUPPORTEMAIL };