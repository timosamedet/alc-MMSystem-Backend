import { PartialType } from '@nestjs/swagger';
import { BaseCertificateDto } from './base-certificate.dto';

export class UpdateCertificateDto extends PartialType(BaseCertificateDto) {}
