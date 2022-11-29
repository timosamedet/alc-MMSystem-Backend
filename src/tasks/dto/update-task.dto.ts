import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BaseTaskDto } from './base-task.dto';
import { TaskStatus } from '../entities/task.entity';
import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDto extends PartialType(BaseTaskDto) {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  status: TaskStatus;
}
