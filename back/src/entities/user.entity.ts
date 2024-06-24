import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from 'typeorm';
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

    @Column()
    password?: string;

    @Column()
    token!: string;

    @Column({ default: 'specialist' })
    role!: 'specialist' | 'admin';

    @Column({ default: false })
    isEmailConfirmed!: boolean;

    @Column({ nullable: true })
    resetPasswordToken?: string;

    @Column({ type: 'timestamp', nullable: true })
    resetPasswordExpires?: Date;

    @BeforeInsert()
    generateToken(): void {
        this.token = randomUUID();
    }
    async comparePassword(password: string): Promise<boolean> {
        if (this.password) return await bcrypt.compare(password, this.password);
        return false;
    }
}