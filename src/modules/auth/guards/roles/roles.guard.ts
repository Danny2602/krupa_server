import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Obtenemos los roles requeridos del decorador @Roles()
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // Si no hay roles especificados, dejamos pasar
        if (!requiredRoles) {
            return true;
        }

        // Obtenemos el usuario de la request (ya fue validado por AuthGuard)
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // SUPER_ADMIN tiene acceso a TODO
        if (user.role === 'SUPER_ADMIN') {
            return true;
        }

        // Si el rol es ADMIN y la ruta requiere USER, permitir acceso (jerarquía)
        if (user.role === 'ADMIN' && requiredRoles.includes('USER')) {
            return true;
        }

        // Verificamos si el usuario tiene alguno de los roles requeridos
        return requiredRoles.some((role) => user.role === role);
    }
}