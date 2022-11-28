import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findUsers() {
    try {
      const users = await this.usersService.findAllUsers();
      if (!users) return new NotFoundException();
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('mentors')
  async findMentors() {
    try {
      const users = await this.usersService.findAllMentors();
      if (!users) return new NotFoundException('No mentors found');
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('mentors-manager')
  async findMentorsManager() {
    try {
      const users = await this.usersService.findAllMentorsManager();
      if (!users) return new NotFoundException('No mentors Manager found');
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('mentors-managers/approved')
  async findMentorsManagerAppr() {
    try {
      const users = await this.usersService.findAllManagerAppr();
      if (!users)
        return new NotFoundException('No mentors manager approved found');
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('mentors/approved')
  async findMentorsAppr() {
    try {
      const users = await this.usersService.findAllMentorsAppr();
      if (!users)
        return new NotFoundException('No mentors manager approved found');
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('mentors-managers/applicant')
  async findMentorsManagerApplicant() {
    try {
      const users = await this.usersService.findAllManagerApplicant();
      if (!users)
        return new NotFoundException('No mentors manager approved found');
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('mentors/applicant')
  async findMentorsApplicant() {
    try {
      const users = await this.usersService.findAllMentorsApplicant();
      if (!users)
        return new NotFoundException('No mentors manager approved found');
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /* @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }*/

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  /*@Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }*/
}
