import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;
}
//Anthony please complete this entity class and delete this comment when you are done. Thanks.