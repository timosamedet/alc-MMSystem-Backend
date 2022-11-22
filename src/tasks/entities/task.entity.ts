import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Programme } from '../../programmes/entities/programme.entity';

export enum TaskStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
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

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.UNASSIGNED, })
  status: TaskStatus;

  @ManyToOne(() => Programme, (programme) => programme.tasks, { cascade: true, })
  programme: Programme;

  @OneToOne(() => User)
  @JoinColumn()
  created_by: User;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => User, { nullable: true, })
  @JoinColumn()
  assigned_to: User;

  @OneToOne(() => User, { nullable: true, })
  @JoinColumn()
  assigned_by: User;

  @Column({ type: 'datetime', nullable: true})
  assigned_at: Date;

  @OneToOne(() => User)
  @JoinColumn()
  last_updated_by: User;

  @Column()
  @UpdateDateColumn()
  last_updated_at: Date;

  @OneToOne(() => User, { nullable: true, })
  @JoinColumn()
  deleted_by: User;

  @Column()
  @DeleteDateColumn()
  deleted_at: Date;
}
