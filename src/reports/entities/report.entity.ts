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
import { Task } from '../../tasks/entities/task.entity';
import { Programme } from '../../programmes/entities/programme.entity';
import { User } from '../../users/entities/user.entity';


export enum ReportType {
  PROGRAMME_REPORT = 'programme_report',
  TASK_REPORT = 'task_report',
}


@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ReportType, default: ReportType.PROGRAMME_REPORT, })
  type: ReportType;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  achievements: string;

  @Column({ type: 'text' })
  blocker: string;

  @Column({ type: 'text' })
  recommendations: string;

  @OneToOne(() => Task, { nullable: true, })
  @JoinColumn()
  task: Task;

  @ManyToOne(() => Programme, (programme) => programme.reports, { nullable: true, })
  programme: Programme;

  @OneToOne(() => User)
  @JoinColumn()
  created_by: User;

  @Column()
  @CreateDateColumn()
  created_at?: Date;

  @OneToOne(() => User)
  @JoinColumn()
  updated_by: User;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User)
  @JoinColumn()
  deleted_by: User;

  @Column()
  @DeleteDateColumn()
  deleted_at: Date;
}
