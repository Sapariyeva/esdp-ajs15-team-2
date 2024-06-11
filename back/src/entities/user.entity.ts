import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';
import { randomUUID } from "crypto";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
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

    @BeforeInsert()
    generateToken(): void {
        this.token = randomUUID();
    }
    async comparePassword(password: string): Promise<boolean> {
        if (this.password) return await bcrypt.compare(password, this.password);
        return false;
    }
}