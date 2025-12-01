import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { GoogleUser } from './interfaces/google-user.interface';
@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async login(createAuthDto: CreateAuthDto) {

    const userExist = await this.prisma.user.findUnique({
      where: { email: createAuthDto.email },
    });

    if (!userExist) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const userValidatePassword = await bcrypt.compare(createAuthDto.password, userExist.password);
    if (!userValidatePassword) {
      throw new HttpException('Contraseña invalida', HttpStatus.UNAUTHORIZED);
    }

    return this.generateToken(userExist);
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
          user: { id: userExist.id, email: userExist.email, role: userExist.role },
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
      user: { id: userExist.id, email: userExist.email, avatar: userExist.avatar, role: userExist.role },
    };
  }

  /**
   * Valida y procesa el usuario que viene desde Google OAuth
   * Crea o actualiza el usuario en la base de datos y genera un token JWT
   * @param googleUser - Datos del usuario desde Google
   * @returns Objeto con mensaje, token y datos del usuario
   */
  async validateGoogleUser(googleUser: GoogleUser) {
    // Buscar por googleId (lo más seguro y robusto)
    const userByGoogleId = await this.prisma.user.findUnique({
      where: { googleId: googleUser.googleId },
    });

    if (userByGoogleId) {
      //NUEVO: Verificar que no sea ADMIN o SUPER_ADMIN
      if (userByGoogleId.role === 'ADMIN' || userByGoogleId.role === 'SUPER_ADMIN') {
        throw new UnauthorizedException(
          'Los administradores no pueden iniciar sesión con Google. Use credenciales normales.'
        );
      }
      return this.generateToken(userByGoogleId);
    }

    // Si no existe por googleId, buscar por email (para vincular cuentas)
    const userByEmail = await this.prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (userByEmail) {
      // El usuario existe por email pero no tenía googleId vinculado. Lo actualizamos.
      const updatedUser = await this.prisma.user.update({
        where: { id: userByEmail.id },
        data: { googleId: googleUser.googleId },
      });
      return this.generateToken(updatedUser);
    }

    // Usuario nuevo -> Crear en BD con googleId
    const newUser = await this.prisma.user.create({
      data: {
        email: googleUser.email,
        name: `${googleUser.firstName} ${googleUser.lastName}`.trim(),
        googleId: googleUser.googleId,
        avatar: googleUser.picture,
        password: '', // Sin password porque entra con Google
      },
    });
    return this.generateToken(newUser);
  }

  private async generateToken(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { message: 'Login exitoso', token: token, user: { id: user.id, email: user.email, role: user.role } };
  }




}
