import { Programme } from 'src/programmes/entities/programme.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TaskStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in-progress',
  PENDING = 'pending',
  UNASSIGNED = 'unassigned',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.UNASSIGNED })
  status: TaskStatus;

  @ManyToOne(() => Programme)
  programme: Programme;

  @ManyToOne(() => User)
  createdBy: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { nullable: true })
  assignedTo: User;

  @ManyToOne(() => User, { nullable: true })
  assignedBy: User;

  @Column({ type: 'datetime', nullable: true })
  assignedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  lastUpdatedBy: User;

  @Column()
  @UpdateDateColumn()
  lastUpdatedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  deletedBy: User;

  @Column()
  @DeleteDateColumn()
  deletedAt: Date;
}
