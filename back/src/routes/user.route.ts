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
        this.router.post('/set-username', authValidate, this.controller.setUsername);
        //Повторная отправка письма с подтверждением почты
        this.router.post('/resend-confirmation', this.controller.resendConfirmationEmail);
        // Аутентификация пользователя
        this.router.post('/login', this.controller.loginUser);
        // Выход пользователя
        this.router.delete('/logout', authValidate, this.controller.logoutUser);
        // Отправка ссылки для подтверждения сброса пароля
        this.router.post('/request-password-reset', this.controller.sendResetPasswordEmail);
    }
}
