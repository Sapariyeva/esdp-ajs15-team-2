import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
// Закоментить нижнюю строку и написать пароль для своей БД
// import {password} from "../../sql-config";
import MainSeeder from '../database/seeds/main.seeder';


const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: 'localhost', // Различие здесь
    port: 3306,
    username: 'youruser',
    password: "yourpassword",
    database: 'yourdatabase',
    synchronize: true,
    logging: true,
    entities: [],
    seeds: [ MainSeeder ],
    factories: []
}

export const appDataSource = new DataSource(options);