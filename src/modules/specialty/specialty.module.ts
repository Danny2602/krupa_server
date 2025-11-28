import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'super_secret_key',
      }),
    ],
  controllers: [SpecialtyController],
  providers: [SpecialtyService,PrismaService],
})
export class SpecialtyModule {}
