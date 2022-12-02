import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgrammesService } from 'src/programmes/programmes.service';
import { TasksService } from 'src/tasks/tasks.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';

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

  findReportByProgrammeId() {}
  findReportByDateCreated() {}
  findReportByUserId() {}
  findReportByDateCreationRange() {}

  updateReport(id: number, updateReportDto: UpdateReportDto) {
    return this.reportRepository.update({ id }, { ...updateReportDto });
  }

  removeReport(id: number) {
    return this.reportRepository.delete(id);
  }
}
