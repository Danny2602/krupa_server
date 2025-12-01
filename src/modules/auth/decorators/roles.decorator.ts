import { SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";
//se usa para obtener los roles que se le pasan como parametro
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
