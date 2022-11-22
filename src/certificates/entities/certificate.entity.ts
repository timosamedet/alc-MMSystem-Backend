import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;
}
