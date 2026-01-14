import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { CloundinaryService } from '../cloundinary/cloundinary.service';
import { CloundinaryModule } from '../cloundinary/cloundinary.module';

@Module({
  imports: [
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'super_secret_key',
      }),
    CloundinaryModule],
  controllers: [DoctorController],
  providers: [DoctorService,PrismaService,CloundinaryService],
})
export class DoctorModule {}
