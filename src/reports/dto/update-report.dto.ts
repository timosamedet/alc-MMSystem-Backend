import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {
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
