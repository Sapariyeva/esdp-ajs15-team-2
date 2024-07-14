import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('surveys')
export class Survey extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'userId' })
    user!: User;
    
    @Column()
    userId!: number;

    @Column({ nullable: true })
    source?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}
