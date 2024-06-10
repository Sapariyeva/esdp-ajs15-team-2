import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class FoundOutType {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    title!: string;

  @Column()
    image!: string;
}