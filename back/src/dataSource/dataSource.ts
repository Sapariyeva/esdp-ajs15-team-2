import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import MainSeeder from '../database/seeds/main.seeder';
import { User } from '../entities/user.entity';

const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: "4452133AM",
    database: 'esdp',
    synchronize: true,
    logging: true,
    entities: [ User ],
    seeds: [ MainSeeder ],
    factories: []
}

export const appDataSource = new DataSource(options);