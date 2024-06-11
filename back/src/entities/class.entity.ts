import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('class')
export class Class {
    @PrimaryGeneratedColumn()
      id!: number; 

    @Column()
    specialistId!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "specialistId"})
      specialist!: User;

    @Column()
      studentId!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "studentId"})
      student!: User;
}