import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'sortCards' })
export class Card {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    title!: string;

  @Column()
    image!: string;
}