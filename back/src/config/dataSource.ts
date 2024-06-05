import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
// Закоментить нижнюю строку и написать пароль для своей БД
import {password} from "../../sql-config";
import { User } from '../entities/user.entity';

const options: DataSourceOptions & SeederOptions = {

    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: password,
    database: 'esdp',
    synchronize: true,
    logging: true,
    entities: [User],
    seeds: [],
    factories: []
}

export const appDataSource = new DataSource(options);