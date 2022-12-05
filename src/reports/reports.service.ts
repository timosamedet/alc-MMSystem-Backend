import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { timeStamp } from 'console';
import { ProgrammesService } from 'src/programmes/programmes.service';
import { Task } from 'src/tasks/entities/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report, ReportType } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
    private userService: UsersService,
    private programmeService: ProgrammesService,
    private taskService: TasksService,
  ) {}
  async create(createReportDto: CreateReportDto, user: User) {
    const { programmeId, taskId, ...data } = createReportDto;
    user = await this.userService.findOne({ id: user.id });
    const programme = await this.programmeService.findOne({ id: programmeId });
    const task = await this.taskService.findOneById(taskId);
    const newReport = this.reportRepository.create({
      ...data,
      created_by: user,
      programme,
      task,
    });
    return this.reportRepository.save(newReport);
  }

  async findAllReports(): Promise<Report[]> {
    return await this.reportRepository.find({
      order: { created_at: 'DESC' },
      relations: ['task', 'programme', 'created_by', 'created_at'],
    });
  }

  async findOneById(reportId: number): Promise<Report> {
    return await this.reportRepository.findOne({
      relations: [
        'task',
        'programme',
        'created_by',
        'achievements',
        'created_at',
      ],
      where: { id: reportId },
    });
  }

  async findReportByProgrammeId(programmeId: number): Promise<Report[]> {
    return await this.reportRepository.find({
      where: { programme: { id: programmeId } },
      order: { created_at: 'DESC' },
    });
  }
  async findReportByTaskId(taskId: number): Promise<Report[]> {
    return await this.reportRepository.find({
      where: { task: { id: taskId } },
      order: { created_at: 'DESC' },
    });
  }

  async findByReportType(reportType: ReportType): Promise<Report[]> {
    return await this.reportRepository.find({
      relations: {
        task: true,
        programme: true,
      },
      where: { type: reportType },
      order: { created_at: 'DESC' },
    });
  }
  async findReportByDateCreated(dateCreated: Date): Promise<Report[]> {
    return await this.reportRepository.find({
      where: { created_at: dateCreated },
    });
  }
  findReportByCreatorId() {}
  findReportByDateCreationRange() {}

  async updateReport(id: number, updateReportDto: UpdateReportDto, user: User) {
    const report = await this.findOneById(id);
    if (!report) {
      throw new NotFoundException(`Report with id: ${id} does not exit`);
    }
    user = await this.userService.findOne({ id: user.id });
    updateReportDto['updated_by'] = user;
    await this.reportRepository.update(id, { ...updateReportDto });
  }

  softDeleteReport() {}
  restoreSoftDeletedReport() {}
  hardDeleteReport() {}

  removeReport(id: number) {
    return this.reportRepository.delete(id);
  }
}
