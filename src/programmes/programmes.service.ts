import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProgrammeDto } from './dto/create-programme.dto';
import { UpdateProgrammeDto } from './dto/update-programme.dto';
import { Programme } from './entities/programme.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProgrammesService {
  constructor(
    @InjectRepository(Programme)
    private programmeRepository: Repository<Programme>,
  ) {}

  async create(createProgrammeDto: CreateProgrammeDto, createdBy: User) {
    const program = this.programmeRepository.create({
      ...createProgrammeDto,
      criteria: JSON.stringify(createProgrammeDto.criteria ?? {}, null, 2),
      created_by: createdBy,
    });

    return await this.programmeRepository.save(program);
  }

  /**
   * This action returns all programmes
   * @highman95
   */
  async findAll(page = 1, chunk = 10): Promise<Programme[]> {
    const limit = !chunk || chunk >= 100 ? 10 : chunk;
    const offset = ((!page || page <= 0 ? 1 : page) - 1) * limit;

    return await this.programmeRepository.find({
      skip: offset,
      take: limit,
    });
  }

  /**
   * This action returns a #${id} programme
   * @highman95
   */
  async findOne(param = {}): Promise<Programme> {
    return await this.programmeRepository.findOne({ where: param });
  }

  /**
   * This action updates a #${id} ${updateProgrammeDto}programme;
   */
  async update(
    id: number,
    updateProgrammeDto: UpdateProgrammeDto,
  ): Promise<Programme> {
    const programme = await this.programmeRepository.findOneBy({ id });
    if (!programme) {
      throw new NotFoundException('Programme not found');
    }

    const { name, description } = updateProgrammeDto;
    programme.name = name;
    programme.description = description;
    return await this.programmeRepository.save(programme);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} programme`;
  // }
}
