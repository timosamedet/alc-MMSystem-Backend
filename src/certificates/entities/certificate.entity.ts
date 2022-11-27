import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Programme } from '../../programmes/entities/programme.entity';
import { User } from '../../users/entities/user.entity';


export enum CertificateStatus {
  PENDING_APPROVAL = 'pending-approval',
  APPROVED = 'approved',
}

@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'datetime', nullable: true, })
  expiresAt: Date;

  @Column({ type: 'enum', enum: CertificateStatus, default: CertificateStatus.PENDING_APPROVAL, })
  status: CertificateStatus;

  @ManyToOne(() => Programme)
  programme: Programme;

  @ManyToOne(() => User)
  issuedTo: User;

  @ManyToOne(() => User)
  createdBy: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { nullable: true })
  approvedBy: User;

  @Column({ type: 'datetime', nullable: true, })
  approvedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  deletedBy: User;

  @Column()
  @DeleteDateColumn()
  deletedAt: Date;
}
