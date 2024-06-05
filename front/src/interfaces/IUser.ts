export interface IUser {
    id: number;
    username: string;
    token?: string;
    role: 'specialist' | 'admin';
    password?: string;
    email: string;
}