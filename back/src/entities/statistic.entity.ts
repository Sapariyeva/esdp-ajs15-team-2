/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'statistic' })
export class Statistic {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  datetime!: Date; 

  @Column()
  successСriteria!: number;
}
