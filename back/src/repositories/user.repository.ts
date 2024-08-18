import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { appDataSource } from "../dataSource/dataSource";

export class UserRepository extends Repository<User> {
    constructor() {
        super(User, appDataSource.createEntityManager());
    }

    // Функция для создания пользователя
    async createUser(user: User): Promise<User> {
        return await this.save(user);
    }

    // Функция для поиска пользователя по email
    async findByEmail(email: string): Promise<User | null> {
        return await this.findOne({ where: { email } });
    }

    // Функция для поиска пользователя по токену
    async findByToken(token: string): Promise<User | null> {
        return await this.findOne({ where: { token } });
    }

    // Функция для поиска пользователя по ID
    async findById(id: number): Promise<User | null> {
        return await this.findOne({ where: { id } });
    }

    // Функция для поиска пользователя по токену сброса пароля
    async findByResetPasswordToken(resetPasswordToken: string): Promise<User | null> {
        return this.findOne({ where: { resetPasswordToken } });
    }

    // Функция для сохранения пользователя
    async saveUser(user: User): Promise<User> {
        return await this.save(user);
    }

    //Функция для сброса пароля
    async resetPassword(user: User): Promise<User> {
        return await this.save(user);
    }

    // Функция для получения всех пользователей
    async getUsers(): Promise<any[]> {
        return await this.find()
    }
}