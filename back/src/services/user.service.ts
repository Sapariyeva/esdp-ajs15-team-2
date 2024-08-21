import bcrypt from 'bcrypt';
import { randomUUID } from "crypto";
import i18next from 'i18next';
import { User } from "@/entities/user.entity";
import { UserRepository } from "@/repositories/user.repository";
import { IUser } from "@/interfaces/IUser.interface";
import { LoginDto, ResetPasswordDto } from "@/dto/user.dto";
import { sendMessageByMail } from "@/middlewares/sendMessagesByMail";

const SALT_WORK_FACTORY = 10;

export class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    // Отправка письма для подтверждения регистрации
    async sendConfirmationEmail(user: User, lang: string): Promise<void> {
        const subject = i18next.t('registration_confirmation', { lng: lang });
        const text = i18next.t(`go_to_confirm_registration http://localhost:8000/users/confirm/${user.token}`, { lng: lang, token: user.token });
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

    // Отправка письма для сброса пароля
    async sendResetPasswordEmail(user: User, lang: string): Promise<void> {
        const subject = i18next.t('password_reset', { lng: lang });
        const text = i18next.t('go_to_reset_password', { lng: lang, token: user.resetPasswordToken });
        const html = `
        <h2>Сброс пароля</h2>
        <i>Ваши данные:</i>
        <ul>
            <li>login: ${user.email}</li>
        </ul>
        <p>Для сброса пароля перейдите по ссылке:</p><p><a href="http://localhost:5173/new_password/${user.resetPasswordToken}">Сбросить пароль</a></p>`;

        await sendMessageByMail( 'igro.vuz@yandex.ru', user.email, subject, text, html);
    }

    // Регистрация пользователя
    async registerUser(email: string, password: string, lang: string): Promise<User> {
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

        await this.sendConfirmationEmail(user, lang);
        delete user.password;
        return user;
    }

    // Аутентификация пользователя
    async loginUser(loginUserDto: LoginDto, lang: string): Promise<IUser | null> {
        const user = await this.repository.findByEmail(loginUserDto.email);

        if (!user) throw new Error(i18next.t('data_error', { lng: lang }));
        const isMatch = await user.comparePassword(loginUserDto.password);
        if (!isMatch) throw new Error(i18next.t('data_error', { lng: lang }));

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
    async confirmEmail(token: string, lang: string): Promise<User | null> {
        const user = await this.repository.findByToken(token);
        if (user) {
            user.isEmailConfirmed = true;
            await this.repository.saveUser(user);
            delete user.password;
            return user;
        } else {
            throw new Error(i18next.t('invalid_token', { lng: lang }));
        }
    }

    // Повторная отправка письма для подтверждения регистрации
    async resendConfirmationEmail(email: string, lang: string): Promise<void> {
        const user = await this.repository.findByEmail(email);
        if (user && !user.isEmailConfirmed) {
            await this.sendConfirmationEmail(user, lang);
        } else {
            throw new Error(i18next.t('user_already_confirmed_or_not_found', { lng: lang }));
        }
    }

    // Изменение имени пользователя
    async setUsername(token: string, username: string, lang: string): Promise<User | null> {
        const user = await this.repository.findByToken(token);
        if (user && user.isEmailConfirmed) {
            user.username = username;
            const updatedUser = await this.repository.saveUser(user);
            delete updatedUser.password;
            return updatedUser;
        } else {
            throw new Error(i18next.t('invalid_token_or_email_not_confirmed', { lng: lang }));
        }
    }

    // Поиск пользователя по токену
    async findByToken(token: string, lang: string): Promise<User | null> {
        const user = await this.repository.findByToken(token);
        if (user) {
            delete user.password;
            return user;
        } else {
            throw new Error(i18next.t('user_search_error', { lng: lang }));
        }
    }

    // Поиск пользователя по email
    async findByEmail(email: string, lang: string): Promise<User | null> {
        const user = await this.repository.findByEmail(email);
        if (user) {
            delete user.password;
            return user;
        } else {
            throw new Error(i18next.t('user_search_error', { lng: lang }));
        }
    }

    // Отправка письма для сброса пароля
    async resetPasswordEmail(email: string, lang: string): Promise<void> {
        const user = await this.repository.findByEmail(email);
        if (!user || !user.isEmailConfirmed) {
            throw new Error(i18next.t('user_not_found', { lng: lang }));
        }

        user.resetPasswordToken = randomUUID();

        await this.repository.saveUser(user);
        await this.sendResetPasswordEmail(user, lang);
    }

    // Повторная отправка письма для сброса пароля
    async resendResetPasswordEmail(email: string, lang: string): Promise<void> {
        const user = await this.repository.findByEmail(email);
        if (user) {
            await this.repository.saveUser(user);
            await this.sendResetPasswordEmail(user, lang);
        } else {
            throw new Error('Пользователь с таким email не найден');
        }
    }

    // Поиск пользователя по токену сброса пароля
    async findByResetPasswordToken(resetPasswordToken: string): Promise<User | null> {
        const user = await this.repository.findByResetPasswordToken(resetPasswordToken);
        if (user) {
            delete user.password;
        }
        return user;
    }

    // Функция для сброса пароля
    async resetPassword(resetPasswordDto: ResetPasswordDto, lang: string): Promise<User | null> {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTORY);
        const user = await this.repository.findByResetPasswordToken(resetPasswordDto.resetPasswordToken);
        if (user) {
            user.password = await bcrypt.hash(resetPasswordDto.password, salt);
            user.resetPasswordToken = '';
            user.generateToken();
            const updatedUser = await this.repository.saveUser(user);
            delete updatedUser.password;
            return updatedUser;
        } else {
            throw new Error(i18next.t('user_search_error', { lng: lang }));
        }
    }

    // Функция для получения списка пользователей
    public async getUsers(): Promise<IUser[]> {
        return await this.repository.getUsers()
    }

}