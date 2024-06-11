import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('organization')
export class Organization {
    @PrimaryGeneratedColumn()
      id!: number; 

    @Column()
      senderId!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "senderId"})
      sender!: User;

    @Column()
      receiverId!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "receiverId"})
      receiver!: User;
}