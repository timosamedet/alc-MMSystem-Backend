import { Programme } from 'src/programmes/entities/programme.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
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

export enum ReportType {
  PROGRAMME_REPORT = 'Programme Report',
  TASK_REPORT = 'Task Report',
}

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ReportType,
    default: ReportType.PROGRAMME_REPORT,
  })
  type: ReportType;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  achievements: string;

  @Column({ type: 'text' })
  blocker: string;

  @Column({ type: 'text' })
  recommendations: string;

  @OneToOne(() => Task, { nullable: true })
  @JoinColumn()
  task: Task;

  @ManyToOne(() => Programme, { nullable: true })
  programme: Programme;

  @ManyToOne(() => User)
  created_by: User;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, { nullable: true })
  updated_by: User;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, { nullable: true })
  deleted_by: User;

  @Column()
  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Programme)
  programmes: Programme[];
}
