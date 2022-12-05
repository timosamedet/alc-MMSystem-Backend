import { UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PostEntity } from 'src/Posts/Posts.entity';
@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  body: string;

  @ManyToOne(() => User, (user: User) => user.comments, { nullable: true })
  @JoinColumn({ name: 'useID' })
  user: User;

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.comments, {
    nullable: true,
  })
  post: PostEntity;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
