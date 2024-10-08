export interface IUser {
    id: number;
    username?: string;
    password?: string;
    email: string;
    token?: string;
    role: 'specialist' | 'admin';
}