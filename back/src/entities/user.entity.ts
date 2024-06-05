import {Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

@Entity('users')
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    username?: string;

    @Column()
    email!: string;

    @Column()
    password?: string;

    @Column()
    token!: string;

    @Column({ default: 'specialist' })
    role!: 'specialist' | 'admin';

    async comparePassword(password: string): Promise<boolean> {
        if (this.password) return await bcrypt.compare(password, this.password);
        return false;
    }

    generateToken(): void {
        this.token = randomUUID();
    }
}