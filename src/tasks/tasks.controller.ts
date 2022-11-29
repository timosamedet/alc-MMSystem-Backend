import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { TaskStatus } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { AssignTaskDto } from './dto/assign-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createNewTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ) {
    return await this.tasksService.createNewTask(createTaskDto, user);
  }

  @Get()
  async getAllTasks() {
    return await this.tasksService.findAllTasks();
  }

  @Get(':id')
  async getOneTaskById(@Param('id') id: number) {
    const task = await this.tasksService.findOneById(id);
    if (!task) throw new NotFoundException();
    return task;
  }

  @Get('assignees/:assigneeId')
  async getTasksByAssigneeId(@Param('assigneeId') assigneeId: number) {
    return await this.tasksService.findByAssigneeId(assigneeId);
  }

  @Get('assigners/:assignerId')
  async getTasksByAssignerId(@Param('assignerId') assignerId: number) {
    return await this.tasksService.findByAssignerId(assignerId);
  }

  @Get('creation-dates/start/:startDate/end/:endDate')
  async getTasksByCreationDateRange(
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
  ) {
    const queryEndDate = new Date(endDate);
    queryEndDate.setDate(queryEndDate.getDate() + 1);
    return this.tasksService.findByCreationDateRange(startDate, queryEndDate);
  }

  @Get('creators/:creatorId')
  async getTasksByCreatorId(@Param('creatorId') creatorId: number) {
    return await this.tasksService.findByCreatorId(creatorId);
  }

  @Get('programmes/:programmeId')
  async getTasksByProgrammeId(@Param('programmeId') programmeId: number) {
    return await this.tasksService.findByProgrammeId(programmeId);
  }

  @Get('status/:taskStatus')
  async getTasksByStatus(@Param('taskStatus') taskStatus: TaskStatus) {
    return await this.tasksService.findByStatus(taskStatus);
  }

  @Patch('assignments/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async assignTaskToUser(
    @Param('id') id: number,
    @Body() assignTaskDto: AssignTaskDto,
    @GetUser() user: User,
  ) {
    await this.tasksService.assignTaskToUser(id, assignTaskDto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateTaskDetails(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    await this.tasksService.updateTask(id, updateTaskDto, user);
  }

  @Delete('soft/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async softDeleteTask(@Param('id') id: number) {
    await this.tasksService.softDeleteTask(id);
  }

  @Patch('soft/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async restoreSoftDeletedTask(@Param('id') id: number) {
    await this.tasksService.restoreSoftDeletedTask(id);
  }

  @Delete('hard/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async hardDeleteTask(@Param('id') id: number) {
    await this.tasksService.hardDeleteTask(id);
  }
}
