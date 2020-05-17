export interface DatabaseConfiguration {
    username: string,
    password: string,
    jdbcString: string,
}

export interface DatabaseConfigurations {
 [key: string]: DatabaseConfiguration;
}