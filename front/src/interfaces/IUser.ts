export interface IUser {
    id: number;
    username: string;
    email: string;
    status: boolean; //добавил статус
    token?: string;
    role: 'specialist' | 'admin';
    password?: string;
    isEmailConfirmed: boolean;
    resetPasswordToken?: string | null;
}