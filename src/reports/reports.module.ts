import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { UsersModule } from 'src/users/users.module';
import { ProgrammesModule } from 'src/programmes/programmes.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { ProgrammesService } from 'src/programmes/programmes.service';
import { TasksService } from 'src/tasks/tasks.service';
import { Task } from 'src/tasks/entities/task.entity';
import { Programme } from 'src/programmes/entities/programme.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    UsersModule,
    ProgrammesModule,
    TasksModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
