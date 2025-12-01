import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { RolesGuard } from './guards/roles/roles.guard';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    // Usamos registerAsync para poder inyectar ConfigService y leer la variable de entorno ANTES de configurar el módulo.
    // Si usáramos register() normal, process.env podría no estar listo o no ser la forma "NestJS" de hacerlo.
    JwtModule.registerAsync({
      imports: [ConfigModule], // Importamos el módulo que tiene la configuración
      inject: [ConfigService], // Inyectamos el servicio para leer las variables
      useFactory: (configService: ConfigService) => ({
        // Leemos la clave secreta desde las variables de entorno de forma segura
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '5h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, GoogleStrategy, RolesGuard],
})
export class AuthModule { }
