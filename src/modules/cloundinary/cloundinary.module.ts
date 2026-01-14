import { Module } from '@nestjs/common';
import { CloundinaryService } from './cloundinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { CloundinaryProvider } from './cloundinary.provider';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super_secret_key',
    }),
  ],
  
  providers: [CloundinaryService, PrismaService, CloundinaryProvider],
  exports: [CloundinaryProvider],
})
export class CloundinaryModule {}