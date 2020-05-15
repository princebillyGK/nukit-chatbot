import { DatabaseConfiguration } from '../types/types'

export class Database {
    private db: GoogleAppsScript.JDBC.JdbcConnection;
    private readonly options: GoogleAppsScript.JDBC.ConnectionAdvancedParameters
    private readonly connectionString: string;

    constructor(config: DatabaseConfiguration) {
        this.options = {
            user: config.username,
            password: config.password
        };
        this.connectionString = config.jdbcString
    }

    public connect() {
        this.db = Jdbc.getConnection(this.connectionString, this.options)
    }

    public disconnect () {
        this.db.close();
    }

    private ensureDbConnection() {
        if(this.db === undefined) {
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