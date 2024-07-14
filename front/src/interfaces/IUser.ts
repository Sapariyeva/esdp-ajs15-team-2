export interface IUser {
    id: number;
    username: string;
    email: string;
    token?: string;
    role: 'specialist' | 'admin';
    password?: string;
    isEmailConfirmed: boolean;
    resetPasswordToken?: string | null;
}