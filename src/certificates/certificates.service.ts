import { Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Injectable()
export class CertificatesService {
  create(createCertificateDto: CreateCertificateDto) {
    return createCertificateDto;
  }

  findAll() {
    return `This action returns all certificates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} certificate`;
  }

  update(id: number, updateCertificateDto: UpdateCertificateDto) {
    return `This action updates a #${id} ${updateCertificateDto}certificate`;
  }

  remove(id: number) {
    return `This action removes a #${id} certificate`;
  }
}
