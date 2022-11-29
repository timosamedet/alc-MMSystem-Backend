import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}
  create(createReportDto: CreateReportDto) {
    const newReport = this.reportRepository.create({
      ...createReportDto,
      created_at: new Date(),
    });
    return this.reportRepository.save(newReport);
  }

  findAll() {
    const reports = this.reportRepository.find();
    return reports;
  }

  findOne(id = {}) {
    const task = this.reportRepository.findOne({ where: id });
    return task;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return this.reportRepository.update({ id }, { ...updateReportDto });
  }

  remove(id: number) {
    return this.reportRepository.delete(id);
  }
}
