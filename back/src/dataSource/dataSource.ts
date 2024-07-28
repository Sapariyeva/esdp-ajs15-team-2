import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import MainSeeder from "@/database/seeds/main.seeder";
import { UserFactory } from "@/database/factories/user.factory";

/**
 * Данная конфигурация нужна при запуске команды npm run dev
 */
const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: "4452133AM",
    database: 'esdp',
    synchronize: true,
    logging: true,
    entities: [`src/entities/*{.ts,.js}`],
    seeds: [ MainSeeder ],
    factories: [UserFactory]
}

/**
 * Данная конфигурация нужна при запуске команды docker compose up
 */
// const options: DataSourceOptions & SeederOptions = {
//   type: "mysql",
//   host: "mysql", // Различие здесь
//   port: 3306,
//   username: "youruser",
//   password: "yourpassword",
//   database: "yourdatabase",
//   synchronize: true,
//   logging: true,
//   entities: [User],
//   seeds: [MainSeeder],
//   factories: [],
// };

export const appDataSource = new DataSource(options);