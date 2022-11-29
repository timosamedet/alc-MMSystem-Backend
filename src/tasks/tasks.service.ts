import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { AssignTaskDto } from './dto/assign-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ProgrammesService } from '../programmes/programmes.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private userService: UsersService,
    private programmesService: ProgrammesService,
  ) {}

  async createNewTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { programmeId, ...data } = createTaskDto;
    user = await this.userService.findOne({ id: user.id });
    const programme = await this.programmesService.findOne({
      id: programmeId,
    });
    const newTask = this.taskRepository.create({
      ...data,
      createdBy: user,
      programme,
    });

    return await this.taskRepository.save(newTask);
  }

  async findAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['programme', 'createdBy', 'assignedBy', 'assignedTo'],
    });
  }

  async findOneById(taskId: number): Promise<Task> {
    return await this.taskRepository.findOne({
      relations: {
        assignedBy: true,
        assignedTo: true,
        createdBy: true,
        deletedBy: true,
        lastUpdatedBy: true,
        programme: true,
      },
      where: { id: taskId },
    });
  }

  async findByAssigneeId(assigneeId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: {
        assignedTo: true,
        programme: true,
      },
      where: { assignedTo: { id: assigneeId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findByAssignerId(assignerId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: {
        assignedBy: true,
        programme: true,
      },
      where: { assignedBy: { id: assignerId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findByCreationDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Task[]> {
    return this.taskRepository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findByCreatorId(creatorId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: {
        createdBy: true,
        programme: true,
      },
      where: { createdBy: { id: creatorId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findByProgrammeId(programmeId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { programme: { id: programmeId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findByStatus(taskStatus: TaskStatus): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: {
        programme: true,
      },
      where: { status: taskStatus },
      order: { createdAt: 'DESC' },
    });
  }

  async assignTaskToUser(id: number, assignTaskDto: AssignTaskDto, user: User) {
    const task = await this.findOneById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    user = await this.userService.findOne({ id: user.id });
    const assignedTo = await this.userService.findOne({
      id: assignTaskDto.assignedToId,
    });

    await this.taskRepository.update(id, {
      assignedAt: new Date(),
      assignedBy: user,
      assignedTo,
      status: TaskStatus.IN_PROGRESS,
    });
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto, user: User) {
    const task = await this.findOneById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    user = await this.userService.findOne({ id: user.id });
    updateTaskDto['lastUpdatedBy'] = user;
    await this.taskRepository.update(id, { ...updateTaskDto });
  }

  async softDeleteTask(id: number) {
    await this.taskRepository.softDelete(id);
  }

  async restoreSoftDeletedTask(id: number) {
    await this.taskRepository.restore(id);
  }

  async hardDeleteTask(id: number) {
    await this.taskRepository.delete(id);
  }
}
