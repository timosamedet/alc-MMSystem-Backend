import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Certificate } from './entities/certificate.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate) private certificateRepository: Repository<Certificate>,
  ) {}
  create(createCertificateDto: CreateCertificateDto) {
    const newCertificate = this.certificateRepository.create({
      ...createCertificateDto,
      created_at: new Date(),
    });
    return this.certificateRepository.save(newCertificate);
  }

  findAll() {
    const certificates = this.certificateRepository.find();
    return certificates;
  }

  findOne(id: {}) {
    const certificate = this.certificateRepository.findOne({ where: id });
    return certificate;
  }

  update(id: number, updateCertificateDto: UpdateCertificateDto) {
    return this.certificateRepository.update({ id }, { ...updateCertificateDto });
  }

  remove(id: number) {
    return this.certificateRepository.delete(id);
  }
}
