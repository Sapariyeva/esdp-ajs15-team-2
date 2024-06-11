import { User } from "../entities/user.entity";
import nodemailer from "nodemailer";
import { UserRepository } from "../repositories/user.repository";
import { IUser } from "../interfaces/IUser.interface";
import { LoginDto } from "../dto/user.dto";
import bcrypt from 'bcrypt';

const SALT_WORK_FACTORY = 10;

export class UserService {
    private repository: UserRepository;
    private transporter: nodemailer.Transporter;

    constructor() {
        this.repository = new UserRepository();
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '474da4dfe02b65',
                pass: '06753b19b9cfc5'
            }
        });
    }

    async sendConfirmationEmail(user: User): Promise<void> {
        const mailOptions = {
            from: 'igrovuz@gmail.com',
            to: user.email,
            subject: 'Подтверждение регистрации',
            text: `Для подтверждения регистрации перейдите по ссылке: http://localhost:8000/users/confirm/${user.token}`,
            html: `<p>Для подтверждения регистрации перейдите по ссылке:</p><p><a href="http://localhost:8000/users/confirm/${user.token}">Подтвердить регистрацию</a></p>`
        };

        await this.transporter.sendMail(mailOptions);
    }

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

    async loginUser(loginUserDto: LoginDto): Promise<IUser | null> {
        const user = await this.repository.findByEmail(loginUserDto.email);

        if (!user) throw new Error('Ошибка данных');
        if (user && user.isEmailConfirmed) {
            const isMatch = await user.comparePassword(loginUserDto.password);
            if (!isMatch) throw new Error('Ошибка пароль');

            user.generateToken();
            const userWithToken = await this.repository.saveUser(user);
            delete userWithToken.password;
            return userWithToken;
        }
        return null;
    }

    async logoutUser(token: string): Promise<void> {
        const user = await this.repository.findByToken(token);
        if (user) {
            user.generateToken();
            await this.repository.saveUser(user);
        }
    }

    async confirmUser(token: string): Promise<User | null> {
        const user = await this.repository.findByToken(token);
        if (user) {
            user.isEmailConfirmed = true;
            await this.repository.saveUser(user);
            delete user.password;
        }
        return user;
    }

    async sendConfirmationEmailAgain(email: string): Promise<void> {
        const user = await this.repository.findByEmail(email);
        if (user && !user.isEmailConfirmed) {
            await this.sendConfirmationEmail(user);
        } else {
            throw new Error("Пользователь уже подтвержден или не найден.");
        }
    }

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

    async findByToken(token: string): Promise<User | null> {
        const user = await this.repository.findByToken(token);
        if (user) {
            delete user.password;
        }
        return user;
    }
}