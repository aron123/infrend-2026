import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    //password: "test",
    database: "infrend2026_bank_sz10",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
});