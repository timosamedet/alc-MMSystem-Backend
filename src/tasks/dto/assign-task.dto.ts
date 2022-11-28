import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BaseTaskDto } from './base-task.dto';
import { IsNotEmpty } from 'class-validator';

export class AssignTaskDto extends PartialType(BaseTaskDto) {
  @ApiProperty()
  @IsNotEmpty()
  assignedToId: number;
}
