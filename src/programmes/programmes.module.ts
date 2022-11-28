import { Module } from '@nestjs/common';
import { ProgrammesService } from './programmes.service';
import { ProgrammesController } from './programmes.controller';
import { Programme } from './entities/programme.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreSec } from 'src/utils/security';

@Module({
  imports: [TypeOrmModule.forFeature([Programme]), ...CoreSec],
  controllers: [ProgrammesController],
  providers: [ProgrammesService],
  exports: [ProgrammesService],
})
export class ProgrammesModule {}
