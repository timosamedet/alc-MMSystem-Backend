import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificateStatus } from './entities/certificate.entity';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { ApproveCertificateDto } from './dto/approve-certificate.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@ApiTags('Certificates')
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post()
  async create(@Body() createCertificateDto: CreateCertificateDto) {
    return await this.certificatesService.create(createCertificateDto);
  }

  @Get()
  async getAllCertificates() {
    return await this.certificatesService.findAll();
  }

  @Get('approval-dates/:startDate/:endDate')
  async getCertificatesByApprovalDateRange(
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
  ) {
    return await this.certificatesService.findCertificatesByApprovalDateRange(startDate, endDate);
  }

  @Get('approvers/:id')
  async getCertificatesByApprover(@Param('id') id: number) {
    return await this.certificatesService.findCertificatesByApprover(+id);
  }

  @Get('creation-dates/:startDate/:endDate')
  async getCertificatesByCreationDateRange(
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
  ) {
    return await this.certificatesService.findCertificatesByCreationDateRange(startDate, endDate);
  }

  @Get('creators/:id')
  async getCertificatesByCreator(@Param('id') id: number) {
    return await this.certificatesService.findCertificatesByCreator(+id);
  }

  @Get('expiry-dates/:startDate/:endDate')
  async getCertificatesByExpiryDateRange(
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
  ) {
    return await this.certificatesService.findCertificatesByExpiryDateRange(startDate, endDate);
  }

  @Get('programmes/:id')
  async getCertificatesByProgramme(@Param('id') id: number) {
    return await this.certificatesService.findCertificatesByProgramme(+id);
    // iLuv2code
  }

  @Get('programmes/:id/status/:status')
  async getCertificatesByProgrammeAndStatus(
    @Param('id') id: number,
    @Param('status') status: CertificateStatus,
  ) {
    return await this.certificatesService.findCertificatesByProgrammeAndStatus(+id, status);
  }


  @Get('recipients/:id')
  async getCertificatesByRecipient(@Param('id') id: number) {
    return await this.certificatesService.findCertificatesByRecipient(+id);
  }

  @Get('recipients/:id/status/:status')
  async getCertificatesByRecipientAndStatus(
    @Param('id') id: number,
    @Param('status') status: CertificateStatus
  ) {
    return await this.certificatesService.findCertificatesByRecipientAndStatus(id, status);
  }

  @Get('status/:status')
  async getCertificatesByStatus(@Param('status') status: CertificateStatus) {
    return await this.certificatesService.findCertificatesByStatus(status);
  }

  @Get(':id')
<<<<<<< HEAD
  findOne(@Param('id') id: number) {
    return this.certificatesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCertificateDto: UpdateCertificateDto,
=======
  async getOneCertificateById(@Param('id') id: number) {
    return await this.certificatesService.findOneById(+id);
  }

  @Patch(':id')
  async approveCertificate(
    @Param('id') id: number,
    @Body() approveCertificateDto: ApproveCertificateDto,
>>>>>>> d4ce28c6cef35e0d398d3c20bfcf8142073820d5
  ) {
    await this.certificatesService.approve(+id, approveCertificateDto);
  }

<<<<<<< HEAD
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.certificatesService.remove(+id);
=======
  @Delete('soft/:id')
  async softDeleteCertificate(@Param('id') id: number) {
    await this.certificatesService.softDeleteCertificate(+id);
  }

  @Patch('soft/:id')
  async restoreSoftDeletedCertificate(@Param('id') id: number) {
    await this.certificatesService.restoreSoftDeletedCertificate(+id);
  }

  @Delete('hard/:id')
  async hardDeleteCertificate(@Param('id') id: number) {
    await this.certificatesService.hardDeleteCertificate(+id);
>>>>>>> d4ce28c6cef35e0d398d3c20bfcf8142073820d5
  }
}
