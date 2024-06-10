import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { FoundOutType } from "./foundOutType.entity";

@Entity('where_found_out')
export class WhereFoundOut {
    @PrimaryGeneratedColumn()
      id!: number; 

    @Column({ nullable: true })
      userId?: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId"})
      user!: User;

    @Column()
      typeId!: number;
  
    @ManyToOne(() => FoundOutType)
    @JoinColumn({ name: "typeId"})
      type!: FoundOutType;
}