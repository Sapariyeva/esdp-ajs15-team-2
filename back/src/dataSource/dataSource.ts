import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import MainSeeder from "../database/seeds/main.seeder";
// import { User } from "../entities/user.entity";
import { UserFactory } from "../database/factories/user.factory";
import path from 'path';

console.log('DIRNAME====', path.join(__dirname, `/*.js`));
console.log('NODE_ENV====', process.env.NODE_ENV);
console.log('PROCESS====', process.env.npm_lifecycle_script?.startsWith('cross-env NODE_ENV=development'));


/**
 * Данная конфигурация нужна при запуске команды npm run dev
 */
const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: 'localhost',
    port: process.env.npm_lifecycle_script?.startsWith('cross-env NODE_ENV=development')? 3307 : 3306,
    username: process.env.npm_lifecycle_script?.startsWith('cross-env NODE_ENV=development') ? 'root' : 'igrovuz',
    password: process.env.npm_lifecycle_script?.startsWith('cross-env NODE_ENV=development') ? "" : 'Igrovuz2024~!',
    database: 'esdp',
    synchronize: true,
    logging: true,
    entities: [process.env.npm_lifecycle_script?.startsWith('cross-env NODE_ENV=development') ? `src/entities/*{.ts,.js}` : path.join(__dirname, `/*.js`)],
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