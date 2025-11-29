import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'super_secret_key',
      }),
    ],
  controllers: [AppointmentController],
  providers: [AppointmentService,PrismaService],
})
export class AppointmentModule {}
