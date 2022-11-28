import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
  UseGuards,
  // Delete,
} from '@nestjs/common';
import { ProgrammesService } from './programmes.service';
import { CreateProgrammeDto } from './dto/create-programme.dto';
import { UpdateProgrammeDto } from './dto/update-programme.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Programs')
@Controller('programs')
export class ProgrammesController {
  constructor(private readonly programmesService: ProgrammesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() createProgrammeDto: CreateProgrammeDto,
    @GetUser() user: User,
  ) {
    return await this.programmesService.create(createProgrammeDto, user);
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('chunk') chunk = 10) {
    return await this.programmesService.findAll(page, chunk);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.programmesService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateProgrammeDto: UpdateProgrammeDto,
  ) {
    return await this.programmesService.update(+id, updateProgrammeDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.programmesService.remove(+id);
  // }
}
