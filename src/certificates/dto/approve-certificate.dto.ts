import { PartialType } from '@nestjs/swagger';
import { BaseCertificateDto } from './base-certificate.dto';

export class ApproveCertificateDto extends PartialType(BaseCertificateDto) {
  approvedBy: number;
}