import { DatabaseConfigurations } from "../types/types";
const properties = PropertiesService.getScriptProperties();

const DBCONFIGS:DatabaseConfigurations = {
    primarydb: {
        username: properties.getProperty('DBUSERNAME') as string,
        password: properties.getProperty('DBPASSWORD') as string,
        jdbcString: properties.getProperty('DBCONNECTIONURL') as string 
    }
}

export {DBCONFIGS}