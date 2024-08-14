/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'card' })
export class Card {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  image!: string;

  @Column()
  video!: string;

  @Column()
  category!: string;
}
