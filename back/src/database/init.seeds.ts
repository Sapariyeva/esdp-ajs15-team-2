import { appDataSource } from '../dataSource/dataSource';
import { runSeeders } from 'typeorm-extension';

appDataSource.initialize().then(async () => {
    console.log('Seeding...');
    await appDataSource.synchronize(true);
    await runSeeders(appDataSource);
    process.exit();
});