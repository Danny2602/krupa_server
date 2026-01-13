import { Module } from '@nestjs/common';
// import { CloundinaryService } from './cloundinary.service';
import { CloundinaryController } from './cloundinary.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super_secret_key',
    }),
  ],
  controllers: [CloundinaryController]
//   providers: [CloundinaryService, PrismaService],
})
export class CloundinaryModule {}