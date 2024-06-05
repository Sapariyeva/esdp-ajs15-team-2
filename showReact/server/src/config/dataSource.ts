import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "helloWorld123",
  database: "showreact",
  synchronize: true,
  logging: true,
  entities: [`src/entities/*{.ts,.js}`],
});