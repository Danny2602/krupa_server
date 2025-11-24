import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

  constructor(private prisma:PrismaService,private jwtService: JwtService){}

  async login(createAuthDto: CreateAuthDto){

    console.log('user',createAuthDto)
    const userExist= await this.prisma.user.findUnique({
      where:{email:createAuthDto.email},
    });

    if(!userExist){
      throw new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND);
    }

    const userValidatePassword= await bcrypt.compare(createAuthDto.password, userExist.password);
    if(!userValidatePassword){
      throw new HttpException('Contraseña invalida',HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: userExist.email, sub: userExist.id };// Payload del token
    const token = await this.jwtService.signAsync(payload);// Genera el token JWT 


    return {message: 'Login exitoso', token:token ,user: {id: userExist.id, email: userExist.email}};
  }


  async checkStatus(tokenOrPayload: string | any) {
    if (!tokenOrPayload) {
      throw new UnauthorizedException('No hay sesión activa');
    }

    // Si recibimos un string, lo tratamos como token y lo verificamos
    if (typeof tokenOrPayload === 'string') {
      try {
        const payload = await this.jwtService.verifyAsync(tokenOrPayload);
        const userExist = await this.prisma.user.findUnique({ where: { id: payload.sub } });
        if (!userExist) {
          throw new UnauthorizedException('Usuario no encontrado');
        }
        return {
          isAuthenticated: true,
          message: 'Sesión activa',
          user: { id: userExist.id, email: userExist.email },
        };
      } catch (error) {
        throw new UnauthorizedException('Token inválido o expirado');
      }
    }

    // Si recibimos un payload (por ejemplo req.user), lo usamos directamente
    const payload = tokenOrPayload;
    const userExist = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!userExist) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return {
      isAuthenticated: true,
      message: 'Usuario autenticado',
      user: { id: userExist.id, email: userExist.email },
    };
  }


}
