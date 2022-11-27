import { BaseCertificateDto } from './base-certificate.dto';
import { PartialType } from '@nestjs/swagger';

export class CreateCertificateDto extends PartialType(BaseCertificateDto) {
  code: string;
  expiresAt: Date;
  programmeId: number;
  recipientId: number;
  creatorId: number;
}
