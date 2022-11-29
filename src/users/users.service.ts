import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User, UserRoles } from './entities/user.entity';
import { SignupCredentialsDto } from '../auth/dto/signup-credentials.dto';
import { UpdatePasswordDto } from './dto/update-password';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: SignupCredentialsDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.createOrUpdate(user);
  }

  /**
   * Get users
   *
   * @return  {Promise<User[]>}
   */
  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        //mentors: true,
        userDetails: true,
      },
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Get mentors
   *
   * @return  {Promise<User[]>} [return user[]]
   */
  async findAllMentors(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        mentors: true,
        manager: false,
        userDetails: true,
      },
      where: { role: UserRoles.Mentor },
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Get mentorsManager
   *
   * @return  {Promise<User[]>}
   */
  async findAllMentorsManager(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        manager: true,
        mentors: false,
        userDetails: true,
      },
      where: { role: UserRoles.MentorManager },
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Get mentors Manager approved
   *
   * @return  {Promise<User[]>} [return User[]]
   */
  async findAllManagerAppr(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        manager: true,
        mentors: false,
        userDetails: true,
      },
      where: {
        role: UserRoles.MentorManager,
        userDetails: {
          approved: true,
        },
      },
    });
  }

  /**
   * Get mentors approved
   *
   * @return  {Promise<User[]>} [return User]
   */
  async findAllMentorsAppr(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        manager: false,
        mentors: true,
        userDetails: true,
      },
      where: {
        role: UserRoles.Mentor,
        userDetails: {
          approved: true,
        },
      },
    });
  }

  /**
   * Get mentors Manager approved
   *
   * @return  {Promise<User[]>} [return User[]]
   */
  async findAllManagerApplicant(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        manager: true,
        mentors: false,
        userDetails: true,
      },
      where: {
        role: UserRoles.MentorManager,
        userDetails: {
          approved: false,
        },
      },
    });
  }

  /**
   * Get mentors approved
   *
   * @return  {Promise<User[]>} [return User]
   */
  async findAllMentorsApplicant(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        manager: false,
        mentors: true,
        userDetails: true,
      },
      where: {
        role: UserRoles.Mentor,
        userDetails: {
          approved: false,
        },
      },
    });
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      const user = await this.userRepository.update(
        { id: +id },
        { ...updateUserDto },
      );

      if (!user) {
        throw new NotFoundException(`User does not exist`);
      }

      return user;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async updatePassword(updateUserDto: UpdatePasswordDto): Promise<User> {
    const { email, password } = updateUserDto;
    if (!email?.trim()) {
      throw new BadRequestException('E-mail is required');
    }

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = password;
    await this.userRepository.update({ email }, { password });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  /* findOne(id: number) {
    return `This action returns a #${id} user`;
  }*/

  async findOne(param = {}): Promise<User> {
    return await this.userRepository.findOne({ where: param });
  }

  /**
   * Update user with #${id}
   *
   * @return  {Promise<User>} [return User]
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user0 = await this.userRepository.findOneBy({ id });
    if (!user0) {
      throw new NotFoundException('User not found');
    }

    const {
      bio,
      city,
      country,
      email,
      github,
      linkedin,
      facebook,
      twitter,
      website,
      headline,
      reset_code,
    } = updateUserDto;

    if (email && email != user0.email) {
      throw new ConflictException('E-mail cannot be updated');
    }

    if (!country?.trim()) user0.country = country;
    if (!city?.trim()) user0.city = city;
    if (!bio?.trim()) user0.bio = bio;

    if (!headline?.trim()) user0.headline = headline;

    user0.github = github;
    user0.linkedin = linkedin;
    user0.facebook = facebook;
    user0.twitter = twitter;
    user0.website = website;
    user0.reset_code = reset_code;

    return await this.createOrUpdate(user0);
  }

  async createOrUpdate(user: User): Promise<User> {
    const user0 = await this.userRepository.save(user);

    // remove PII
    delete user0.password;
    delete user0.salt;

    return user0;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
