import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  
  imports: [AuthModule, UsersModule,
    JwtModule.register({
          secret: process.env.JWT_SECRET || 'super_secret_key',// Clave secreta para firmar los tokens
          signOptions: { expiresIn: '5h' },// Configura la expiración del token
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
