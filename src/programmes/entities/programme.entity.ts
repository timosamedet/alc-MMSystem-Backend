import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { Status } from '../../utils/enums';
import { Report } from 'src/reports/entities/report.entity';
import { User } from 'src/users/entities/user.entity';

export class Criteria {}

@Entity('programmes')
export class Programme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ nullable: true })
  date_completed?: Date;

  @ManyToOne(() => User, { nullable: true })
  archived_by?: User;

  @Column({ nullable: true })
  date_archived?: Date;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @Column({ type: 'json', nullable: true })
  criteria: Criteria;

  @ManyToOne(() => User, { nullable: true })
  created_by: User;

  @Column({ type: 'datetime' })
  @CreateDateColumn()
  created_at?: Date;

  @Column({ type: 'datetime' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Task, (task) => task.programme, {
    nullable: true,
    cascade: true,
  })
  tasks: Task[];

  @OneToMany(() => Report, (report) => report.programmes, {
    nullable: true,
  })
  report: Report[];

  @ManyToMany(() => User, (user) => user.manager, {
    nullable: true,
  })
  managers: User[];
}
