import { DatabaseConfiguration } from '../types/types'

export class Database {
    db: GoogleAppsScript.JDBC.JdbcConnection;
    private readonly username: string;
    private readonly password: string;
    private readonly connectionString: string;

    constructor(config: DatabaseConfiguration) {
        this.username = config.username;
        this.password = config.password;
        this.connectionString = config.jdbcString;
    }

    public connect() {
        this.db = Jdbc.getConnection(this.connectionString, this.username, this.password)
    }

    public disconnect() {
        this.db.close();
    }

    private ensureDbConnection() {
        if (this.db === undefined) {
            throw new Error("Database is not connected");
        }
    }

    private prepareQuery(sql: string, param: (string | number)[])
        : GoogleAppsScript.JDBC.JdbcPreparedStatement {
        const stmt: GoogleAppsScript.JDBC.JdbcPreparedStatement
            = this.db.prepareStatement(sql);
        param.map((value, index) => {
            if (typeof value == 'number') {
                value = value.toString();
            }
            stmt.setString(index + 1, value);
        });
        return stmt;
    }

    public execute(sql: string, param?: (string | number)[]): boolean {
        this.ensureDbConnection();
        if (param !== undefined) {
            return this.prepareQuery(sql, param).execute();
        } else {
            return this.db.createStatement().execute(sql);
        }
    }

    public executeQuery(sql: string, param?: (string | number)[]): GoogleAppsScript.JDBC.JdbcResultSet {
        this.ensureDbConnection();
        if (param !== undefined) {
            return this.prepareQuery(sql, param).executeQuery();
        } else {
            return this.db.createStatement().executeQuery(sql);
        }
    }

}