import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UsersModule } from '../users/users.module';
import { ProgrammesModule } from '../programmes/programmes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule, ProgrammesModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
