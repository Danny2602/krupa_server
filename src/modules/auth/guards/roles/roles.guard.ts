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

        // Definimos la jerarquía de roles (mayor número = más privilegios)
        const roleHierarchy: Record<Role, number> = {
            USER: 1,
            ADMIN: 2,
            SUPER_ADMIN: 3,
        };

        // Obtenemos el nivel del rol del usuario
        const userRoleLevel = roleHierarchy[user.role];

        // Obtenemos el nivel mínimo requerido (el más alto de los roles requeridos)
        const minRequiredLevel = Math.min(
            ...requiredRoles.map((role) => roleHierarchy[role])
        );

        // El usuario puede acceder si su nivel es mayor o igual al nivel mínimo requerido
        return userRoleLevel >= minRequiredLevel;
    }
}