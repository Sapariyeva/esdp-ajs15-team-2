import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcrypt';
import { randomUUID } from "crypto";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ default: 'Специалист' }) // Значение по умолчанию для имени пользователя
    username!: string;

    @Column()
    email!: string;

    @Column({ default: 'qwerty123' }) // Значение по умолчанию для пароля
    password?: string;

    @Column()
    status!: boolean;

    @Column()
    token!: string;

    @Column({ default: 'specialist' })
    role!: 'specialist' | 'admin';

    @Column({ default: false })
    isEmailConfirmed!: boolean;

    @Column({ nullable: true })
    resetPasswordToken?: string;

    @BeforeInsert()
    @BeforeUpdate()
    capitalizeUsername(): void {
        this.username = this.username.charAt(0).toUpperCase() + this.username.slice(1).toLowerCase();
    }
    
    @BeforeInsert()
    generateToken(): void {
        this.token = randomUUID();
    }
    async comparePassword(password: string): Promise<boolean> {
        if (this.password) return await bcrypt.compare(password, this.password);
        return false;
    }
}