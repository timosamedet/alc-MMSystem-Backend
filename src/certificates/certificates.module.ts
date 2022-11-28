import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from './entities/certificate.entity';
import { User } from '../users/entities/user.entity';
import { Programme } from '../programmes/entities/programme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Certificate, Programme, User])],
  controllers: [CertificatesController],
  providers: [CertificatesService],
})
export class CertificatesModule {}
