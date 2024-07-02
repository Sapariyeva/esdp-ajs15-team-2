import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { IUser } from "../interfaces/IUser.interface";
import { LoginDto } from "../dto/user.dto";
import bcrypt from 'bcrypt';
import { randomUUID } from "crypto";
import { sendMessageByMail } from "../middlewares/sendMessagesByMail";

const SALT_WORK_FACTORY = 10;

export class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    // Отправка письма для подтверждения регистрации
    async sendConfirmationEmail(user: User): Promise<void> {
        const subject = 'Подтверждение регистрации';
        const text = `Для подтверждения регистрации перейдите по ссылке: http://localhost:8000/users/confirm/${user.token}`;
        const html = `
            <h2>Вы зарегистрировались</h2>
            <i>Ваши данные:</i>
            <ul>
                <li>login: ${user.email}</li>
            </ul>
            <p>Для подтверждения регистрации перейдите по ссылке:</p><p><a href="http://localhost:8000/users/confirm/${user.token}">Подтвердить регистрацию</a></p>
        `;

        await sendMessageByMail( 'igro.vuz@yandex.ru', user.email, subject, text, html);
    }

    // Регистрация пользователя
    async registerUser(email: string, password: string): Promise<User> {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTORY);
        const existingUser = await this.repository.findByEmail(email);
        if (existingUser && existingUser.isEmailConfirmed) {
            throw new Error('Email уже используется');
        }

        let user;
        if (existingUser) {
            // Если пользователь существует и не подтвержден, перезаписываем его данные
            existingUser.password = await bcrypt.hash(password, salt);
            existingUser.generateToken();
            user = await this.repository.saveUser(existingUser);
        } else {
            // Если пользователь не существует, создаем нового пользователя
            const userData = new User();
            userData.email = email;
            userData.password = await bcrypt.hash(password, salt);;
            userData.isEmailConfirmed = false;
            userData.generateToken();

            user = await this.repository.saveUser(userData);
        }

        await this.sendConfirmationEmail(user);
        delete user.password;
        return user;
    }

    // Аутентификация пользователя
    async loginUser(loginUserDto: LoginDto): Promise<IUser | null> {
        const user = await this.repository.findByEmail(loginUserDto.email);

        if (!user) throw new Error('Ошибка данных');
        const isMatch = await user.comparePassword(loginUserDto.password);
        if (!isMatch) throw new Error('Ошибка данных');

        if (user && user.isEmailConfirmed) {
            user.generateToken();
            const userWithToken = await this.repository.saveUser(user);
            delete userWithToken.password;
            return userWithToken;
        }
        return null;
    }

    // Выход пользователя
    async logoutUser(token: string): Promise<void> {
        const user = await this.repository.findByToken(token);
        if (user) {
            user.generateToken();
            await this.repository.saveUser(user);
        }
    }

    // Подтверждение регистрации по электронной почте
    async confirmEmail(token: string): Promise<User | null> {
        const user = await this.repository.findByToken(token);
        if (user) {
            user.isEmailConfirmed = true;
            await this.repository.saveUser(user);
            delete user.password;
        }
        return user;
    }

    // Повторная отправка письма для подтверждения регистрации
    async resendConfirmationEmail(email: string): Promise<void> {
        const user = await this.repository.findByEmail(email);
        if (user && !user.isEmailConfirmed) {
            await this.sendConfirmationEmail(user);
        } else {
            throw new Error("Пользователь уже подтвержден или не найден.");
        }
    }

    // Изменение имени пользователя
    async setUsername(token: string, username: string): Promise<User | null> {
        const user = await this.repository.findByToken(token);
        if (user && user.isEmailConfirmed) {
            user.username = username;
            const updatedUser = await this.repository.saveUser(user);
            delete updatedUser.password;
            return updatedUser;
        }
        return null;
    }

    // Поиск пользователя по токену
    async findByToken(token: string): Promise<User | null> {
        const user = await this.repository.findByToken(token);
        if (user) {
            delete user.password;
        }
        return user;
    }

    // Поиск пользователя по email
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.findByEmail(email);
        if (user) {
            delete user.password;
        }
        return user;
    }

    // Отправка письма для сброса пароля
    async sendResetPasswordEmail(email: string): Promise<void> {
        const user = await this.repository.findByEmail(email);
        if (!user || !user.isEmailConfirmed) {
            throw new Error('Пользователь с таким email не найден');
        }

        user.resetPasswordToken = randomUUID();
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 час

        await this.repository.saveUser(user);

        const subject = 'Сброс пароля';
        const text = `Для сброса пароля перейдите по ссылке: http://localhost:8000/users/reset-password/${user.resetPasswordToken}`;
        const html = `<p>Для сброса пароля перейдите по ссылке:</p><p><a href="http://localhost:8000/users/reset-password/${user.resetPasswordToken}">Сбросить пароль</a></p>`;

        await sendMessageByMail( 'igrovuz@gmail.com', user.email, subject, text, html);
    }

}