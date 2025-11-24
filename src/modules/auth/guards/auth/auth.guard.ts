import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
@Injectable()  

export class AuthGuard implements CanActivate {

  // 1. JwtService se inyecta para verificar tokens
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    // 2. Obtengo la request real (como Express)
    const request = context.switchToHttp().getRequest();

    // 3. Leo la cookie que enviaste en el login
    const token = request.cookies?.token;

    // 4. Si no hay token → usuario no autenticado
    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    try {
      // 5. Verifico que el token sea válido
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // 6. Adjuntamos el usuario al request para usarlo en el controlador
      request.user = payload;

      // 7. Todo está bien → dejar pasar
      return true;

    } catch (error) {
      // 8. Token corrupto o expirado → bloquear
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}

