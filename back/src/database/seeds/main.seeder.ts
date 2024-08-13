import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '@/entities/user.entity';
import bcrypt from 'bcrypt';
export default class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userFactory = factoryManager.get(User);

        // Создаем статичного пользователя (админа)
        const salt = await bcrypt.genSalt(10);
        const admin = new User();
        admin.username = 'admin';
        admin.email = 'admin@example.com';
        admin.generateToken();
        admin.isEmailConfirmed = true;
        admin.role = 'admin';
        admin.password = await bcrypt.hash('admin123', salt);

        await dataSource.getRepository(User).save(admin);

        // Создаем и сохраняем пять случайных пользователей
        const users = await userFactory.saveMany(5);
        await dataSource.getRepository(User).save(users);
    };
};