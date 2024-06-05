import {Repository} from "typeorm";
import bcrypt from 'bcrypt';
import { appDataSource } from "../config/dataSource";
import { User } from "../entities/user.entity";
import { UserDto } from "../dto/user.dto";
import { IUser } from "../interfaces/IUser.interface";
import nodemailer from "nodemailer";

const SALT_WORK_FACTORY = 10;

export class UserRepository extends Repository<User> {
    private transporter: nodemailer.Transporter;

    constructor() {
        super(User, appDataSource.createEntityManager());
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "igrovuz@gmail.com",
                pass: "igrovuz123"
            }
        })
    }

    async sendConfirmationEmail(user: User): Promise<void> {
        const mailOptions = {
            from: '"Your App" <yourapp@example.com>',
            to: user.email,
            subject: 'Подтверждение регистрации',
            text: `Для подтверждения регистрации перейдите по ссылке: http://yourapp.com/confirm/${user.token}`,
            html: `<p>Для подтверждения регистрации перейдите по ссылке:</p><p><a href="http://yourapp.com/confirm/${user.token}">Подтвердить регистрацию</a></p>`
        };
    
        try {
            console.log('Отправка письма:', mailOptions);
            await this.transporter.sendMail(mailOptions);
            console.log('Письмо отправлено');
        } catch (error) {
            console.error('Ошибка при отправке письма:', error);
        }
    }

    async signIn(signInUserDto: UserDto): Promise<IUser> {
        const user = await this.findOne({
            where: {username: signInUserDto.username}
        });

        if (!user) throw new Error('Ошибка данных');

        const isMatch = await user.comparePassword(signInUserDto.password);
        if (!isMatch) throw new Error('Ошибка данных');

        user.generateToken();
        const userWithToken = await this.save(user);
        delete userWithToken.password;

        return userWithToken;
    }

    async register(registerUserDto: UserDto): Promise<IUser> {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTORY);
        const userData = await this.create(registerUserDto);
        userData.password = await bcrypt.hash(registerUserDto.password, salt);
        userData.generateToken();

        const user = await this.save(userData);
        delete user.password;

        await this.sendConfirmationEmail(user);

        return user;
    }

    async getUserByToken(token: string): Promise<User | null> {
        return await this.findOneBy({token});
    }

    async clearToken(token: string): Promise<void> {
        const user = await this.getUserByToken(token);
        if (user) {
            user.generateToken();
            await this.save(user);
        }
    }
}