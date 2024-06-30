import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { authValidate } from '../middlewares/authValidate';
import { UserController } from '../controllers/user.controller';

export class UserRoute implements IRoute {
    public path = '/users';
    public router = Router();
    private controller: UserController;

    constructor() {
        this.controller = new UserController();
        this.init();
    }
 
    private init() {
        // Регистрация нового пользователя
        this.router.post('/register', this.controller.register);
        // Подтверждение почты
        this.router.get('/confirm/:token', this.controller.confirmEmail);
        // Установка имени пользователя
        this.router.post('/set_username', authValidate, this.controller.setUsername);
        //Повторная отправка письма с подтверждением почты
        this.router.post('/resend_confirmation', this.controller.resendConfirmationEmail);
        // Аутентификация пользователя
        this.router.post('/login', this.controller.loginUser);
        // Выход пользователя
        this.router.delete('/logout', authValidate, this.controller.logoutUser);
        // Поиск пользователя по почте
        this.router.get('/find_by_email', this.controller.findByEmail);
        // Отправка ссылки для подтверждения сброса пароля
        this.router.post('/request_password_reset', this.controller.sendResetPasswordEmail);
        // Аутентификация через Google
        this.router.get('/auth/google', this.controller.googleAuth);
        this.router.get('/auth/google/callback', this.controller.googleAuthCallback);
    }
}
