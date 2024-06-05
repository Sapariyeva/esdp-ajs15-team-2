import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthService } from '../services/auth.service';
import { UserDto } from '../dto/user.dto';
import { formatErrors } from '../helpers/formatErrors';
import { IRequestWithUser } from '../interfaces/IRequestWithUser.interface';

export class AuthController {
    private service: AuthService;

    constructor() {
        this.service = new AuthService();
    }

    signIn: RequestHandler = async (req, res): Promise<void> => {
        try {
            const signInUserDto = plainToInstance(UserDto, req.body);
            const user = await this.service.signIn(signInUserDto);
            res.send(user);
        } catch (e) {
            res.status(401).send({ error: { message: (e as Error).message}});
        }
    };

    register: RequestHandler = async (req, res): Promise<void> => {
        try {
            const registerUserDto = plainToInstance(UserDto, req.body);

            const errors = await validate(registerUserDto, { 
                whitelist: true, 
                validationError: { target: false, value: false } 
            });
            if (errors.length > 0) {
                res.status(400).send(formatErrors(errors));
                return;
            }
            const user = await this.service.register(registerUserDto);
            res.send(user);
        } catch (e) {
            if ((e as { code: string }).code === 'ER_DUP_ENTRY') {
                res.status(401).send({ error: { message: 'User already exists' } });
            } else {
                res.status(500).send({ error: { message: 'Oops something went wrong' } });
            }
        }
    };

    logout: RequestHandler = async (req: IRequestWithUser, res) => {
        if(!req.user?.token) return res.send( { message: 'success' } );
        try {
            const { token } = req.user;
            await this.service.logout(token);
        } catch (e) {
            return res.status(500).send({ error: { message: 'Internal server error' } });
        }
        return res.send({ message: `success ` });
    }
}