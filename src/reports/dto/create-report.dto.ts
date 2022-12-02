import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReportDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  achievements: string;

  @ApiProperty()
  @IsNotEmpty()
  blocker: string;

  @ApiProperty()
  @IsNotEmpty()
  recommendations: string;

  @ApiProperty()
  programmeId?: number;

  @ApiProperty()
  taskId?: number;
}
