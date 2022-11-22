import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Programme } from '../../programmes/entities/programme.entity';
import { User } from '../../users/entities/user.entity';


export enum CertificateStatus {
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
}

@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'datetime', nullable: true, })
  expires_at: Date;

  @Column({ type: 'enum', enum: CertificateStatus, default: CertificateStatus.PENDING_APPROVAL, })
  status: CertificateStatus;

  @ManyToOne(() => Programme)
  programme: Programme;

  @ManyToOne(() => User)
  issued_to: User;

  @ManyToOne(() => User)
  created_by: User;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, { nullable: true })
  approved_by: User;

  @Column({ type: 'datetime', nullable: true, })
  approved_at: Date;

  @ManyToOne(() => User, { nullable: true })
  deleted_by: User;

  @Column()
  @DeleteDateColumn()
  deleted_at: Date;
}
