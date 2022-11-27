import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { ApproveCertificateDto } from './dto/approve-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Certificate, CertificateStatus } from './entities/certificate.entity';
import { Programme } from '../programmes/entities/programme.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate) private certificateRepository: Repository<Certificate>,
    @InjectRepository(Programme) private programmeRepository: Repository<Programme>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createCertificateDto: CreateCertificateDto): Promise<Certificate> {
    const creator = await this.userRepository.findOneBy({ id: createCertificateDto["creatorId"] });
    // if (!creator) throw new NotFoundException("Certificate creator is not a valid user");
    const recipient = await this.userRepository.findOneBy({ id: createCertificateDto["recipientId"] });
    // if (!recipient) throw new NotFoundException("Intended certificate recipient is not a valid user");
    const program = await this.programmeRepository.findOneBy({ id: createCertificateDto["programmeId"] })
    if (!program) throw new NotFoundException("Programme not found");
    createCertificateDto["programme"] = program;
    createCertificateDto["issuedTo"] = recipient;
    createCertificateDto["createdBy"] = creator;
    const newCertificate = await this.certificateRepository.create({...createCertificateDto});
    return await this.certificateRepository.save(newCertificate);
  }

  async findAll(): Promise<Certificate[]> {
    const certificates = await this.certificateRepository.find({
      order: { createdAt: 'DESC' },
    });
    return certificates;
  }

  async findCertificatesByApprovalDateRange(startDate: Date, endDate: Date): Promise<Certificate[]> {
    const queryEndDate = new Date(endDate);
    queryEndDate.setDate(queryEndDate.getDate() + 1);
    return await this.certificateRepository.find({
      relations: {
        programme: true,
      },
      where: { approvedAt: Between(startDate, queryEndDate) },
      order: { approvedAt: 'DESC' },
    });
  }

  async findCertificatesByApprover(approverId: number): Promise<Certificate[]> {
    return await this.certificateRepository.find({
      relations: {
        programme: true,
        approvedBy: true
      },
      where: { approvedBy: { id: approverId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findCertificatesByCreationDateRange(startDate: Date, endDate: Date): Promise<Certificate[]> {
    const queryEndDate = new Date(endDate);
    queryEndDate.setDate(queryEndDate.getDate() + 1);
    return await this.certificateRepository.find({
      relations: {
        programme: true,
      },
      where: { createdAt: Between(startDate, queryEndDate) },
      order: { createdAt: 'DESC' },
    });
  }

  async findCertificatesByCreator(creatorId: number): Promise<Certificate[]> {
    return await this.certificateRepository.find({
      relations: {
        programme: true,
        createdBy: true
      },
      where: { createdBy: { id: creatorId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findCertificatesByExpiryDateRange(startDate: Date, endDate: Date): Promise<Certificate[]> {
    const queryEndDate = new Date(endDate);
    queryEndDate.setDate(queryEndDate.getDate() + 1);
    return await this.certificateRepository.find({
      relations: {
        programme: true,
      },
      where: { expiresAt: Between(startDate, queryEndDate) },
      order: { expiresAt: 'DESC' },
    });
  }

  async findCertificatesByProgramme(programmeId: number): Promise<Certificate[]> {
    return await this.certificateRepository.find({
      relations: {
        programme: true,
      },
      where: { programme: { id: programmeId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findCertificatesByProgrammeAndStatus(
    programmeId: number,
    certificateStatus: CertificateStatus
  ): Promise<Certificate[]> {
    return await this.certificateRepository.find({
      relations: {
        programme: true,
        issuedTo: true,
      },
      where: {
        status: certificateStatus,
        programme: { id: programmeId }
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findCertificatesByRecipient(recipientId: number): Promise<Certificate[]> {
    return await this.certificateRepository.find({
      relations: {
        programme: true,
        issuedTo: true
      },
      where: { issuedTo: { id: recipientId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findCertificatesByRecipientAndStatus(
    recipientId: number,
    certificateStatus: CertificateStatus
  ): Promise<Certificate[]> {
    return await this.certificateRepository.find({
      relations: {
        programme: true,
        issuedTo: true
      },
      where: {
        status: certificateStatus,
        issuedTo: { id: recipientId },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findCertificatesByStatus(certificateStatus: CertificateStatus): Promise<Certificate[]> {
    return await this.certificateRepository.find({
      relations: {
        programme: true,
      },
      where: { status: certificateStatus },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneById(certificateId: number) {
    const certificate = await this.certificateRepository.findOne({
      relations: {
        programme: true,
        issuedTo: true,
      },
      where: { id: certificateId },
      order: {createdAt: 'DESC'}
    });
    return certificate;
  }

  async approve(approverId: number, approveCertificateDto: ApproveCertificateDto) {
    const approver = await this.userRepository.findOneBy({ id: approverId });
    // if (!approver) throw new NotFoundException("This certificate approver is not a valid user");
    await this.certificateRepository.update(
      approverId, {
        status: CertificateStatus["APPROVED"],
        approvedBy: approver,
        approvedAt: new Date(),
      }
    );
  }

  async softDeleteCertificate(id: number) {
    await this.certificateRepository.softDelete(id);
  }

  async restoreSoftDeletedCertificate(id: number) {
    await this.certificateRepository.restore(id);
  }

  async hardDeleteCertificate(id: number) {
    await this.certificateRepository.delete(id);
  }
}
