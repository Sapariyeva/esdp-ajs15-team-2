import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("cards")
export class Card {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  image!: string;

  @Column()
  video!: string;
}