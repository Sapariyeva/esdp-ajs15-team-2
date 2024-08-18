import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import MainSeeder from "../database/seeds/main.seeder";
// import { User } from "../entities/user.entity";
import { UserFactory } from "../database/factories/user.factory";

/**
 * Данная конфигурация нужна при запуске команды npm run dev
 */
const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'igrovuz',
    password: "Igrovuz2024~!",
    database: 'esdp',
    synchronize: true,
    logging: true,
    entities: [`dist/entities/**/*.js`],
    seeds: [MainSeeder],
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