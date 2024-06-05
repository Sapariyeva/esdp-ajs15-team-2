import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { AuthController } from '../controllers/auth.controller';
import { authValidate } from '../middlewares/authValidate';

export class AuthRoute implements IRoute {
    public path = '/users';
    public router = Router();
    private controller: AuthController;

    constructor() {
        this.controller = new AuthController();
        this.init();
    }
 
    private init() {
        this.router.post('/register', this.controller.register);
        this.router.post('/login', this.controller.signIn);
        this.router.delete('/logout', authValidate, this.controller.logout);
    }
}
