import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';




const options: DataSourceOptions & SeederOptions = {

    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '780780',
    database: 'test',
    synchronize: true,
    logging: true,
    entities: [],
    seeds: [],
    factories: []
}

// export const appDataSource = new DataSource(options)
export const appDataSource = null;
