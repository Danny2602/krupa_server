// src/modules/auth/decorators/get-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { User } from '@prisma/client';   // ajusta el import si tu tipo está en otro sitio

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): User => {
        const request = ctx.switchToHttp().getRequest();
        // El guard garantiza que `request.user` existe aquí.
        // El operador `!` le dice a TypeScript que no es undefined.
        return request.user!;
    },
);