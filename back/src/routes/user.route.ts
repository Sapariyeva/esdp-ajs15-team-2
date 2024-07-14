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
        this.router.get('/find_by_email/:email', this.controller.findByEmail);
        // Поиск пользователя по токену сброса пароля
        this.router.get('/find_by_reset_password_token/:token', this.controller.findByResetPasswordToken);
        // Отправка ссылки для подтверждения сброса пароля
        this.router.post('/request_password_reset', this.controller.resetPasswordEmail);
        // Повторная отправка письма для сброса пароля
        this.router.post('/resend_password_reset', this.controller.resendResetPasswordEmail);
        // Сброс пароля
        this.router.post('/reset_password/:token', this.controller.resetPassword);
        // Аутентификация через Google
        this.router.get('/auth/google', this.controller.googleAuth);
        this.router.get('/auth/google/callback', this.controller.googleAuthCallback);
    }
}
