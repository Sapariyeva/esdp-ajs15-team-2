import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { appDataSource } from "../dataSource/dataSource";

export class UserRepository extends Repository<User> {
    constructor() {
        super(User, appDataSource.createEntityManager());
    }

    async createUser(user: User): Promise<User> {
        return await this.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.findOne({ where: { email } });
    }

    async findByToken(token: string): Promise<User | null> {
        return await this.findOne({ where: { token } });
    }

    async saveUser(user: User): Promise<User> {
        return await this.save(user);
    }
}