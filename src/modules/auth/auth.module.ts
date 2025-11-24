import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET || 'super_secret_key',// Clave secreta para firmar los tokens
    // signOptions: { expiresIn: '1h' },// Configura la expiración del token

  })],
  controllers: [AuthController],
  providers: [AuthService,PrismaService],
})
export class AuthModule {}
