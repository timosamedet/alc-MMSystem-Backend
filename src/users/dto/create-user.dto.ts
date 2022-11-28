import { IsIn, IsNotEmpty } from 'class-validator';
import { Gender } from 'src/utils/enums';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  phone: string;
  email: string;
  username: string;
  photo: string;
  dob: Date;

  @IsIn(['male', 'female'])
  gender: Gender;

  country: string;
  city: string;

  github: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  website: string;

  bio: string;
  headline: string;
  reset_code?: string;
}
