import bcrypt from "bcrypt";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
@Unique(['mail'])
export class User {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    mail!: string;

  @Column()
    password!: string;

  @Column({ nullable: true })
    token?: string;

  @Column()
    role!: UserRole; 

  public async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  public generateToken() {
    this.token = crypto.randomUUID();
  }
}

export type UserRole = 'admin' | 'user' | 'specialist' | 'parent';