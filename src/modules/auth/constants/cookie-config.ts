import { CookieOptions } from 'express';

/**
 * Configuración estándar para cookies de autenticación
 * Usar esto en todos los endpoints que manejen tokens
 */
export const COOKIE_CONFIG: CookieOptions = {
    httpOnly: true,
    secure: false, // true en producción con HTTPS
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
};

export const COOKIE_NAME = 'token';
