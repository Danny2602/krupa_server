import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SpecialtyController],
  providers: [SpecialtyService,PrismaService],
})
export class SpecialtyModule {}
