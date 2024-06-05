import { UserDto } from '../dto/user.dto';
import { IUser } from '../interfaces/IUser.interface';
import { UserRepository } from '../repositories/user.repository';

export class AuthService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async signIn(signInUserDto: UserDto): Promise<IUser> {
        return await this.repository.signIn(signInUserDto);
    };

    async register(registerUserDto: UserDto): Promise<IUser> {
        return await this.repository.register(registerUserDto);
    };

    async getUserByToken(token: string): Promise<IUser | null> {
        return await this.repository.getUserByToken(token);
    }

    async logout(token: string): Promise<void> {
        await this.repository.clearToken(token);
    }
};