import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { BankTransfer } from "./entity/BankTransfer";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    //password: "test",
    database: "infrend2026_bank_k8",
    synchronize: true,
    logging: true,
    entities: [User, BankTransfer],
    subscribers: [],
    migrations: [],
});