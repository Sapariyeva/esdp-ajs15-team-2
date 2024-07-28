import { User } from '@/entities/user.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';


export const UserFactory = setSeederFactory(User, (faker: Faker) => {

    const user = new User();
    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.status = faker.datatype.boolean();
    user.generateToken();
    user.isEmailConfirmed = faker.datatype.boolean();
    return user;
});