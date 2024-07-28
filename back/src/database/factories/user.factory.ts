import { User } from '@/entities/user.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import bcrypt from 'bcrypt';


export const UserFactory = setSeederFactory(User, async (faker: Faker) => {
    const salt = await bcrypt.genSalt(10);

    const user = new User();
    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.generateToken();
    user.isEmailConfirmed = faker.datatype.boolean();
    user.password = await bcrypt.hash('$RFV5tgb', salt);
    return user;
});