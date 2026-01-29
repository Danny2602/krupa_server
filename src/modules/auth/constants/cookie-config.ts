import { CookieOptions } from 'express';

/**
 * Configuración estándar para cookies de autenticación
 * Usar esto en todos los endpoints que manejen tokens
 */
export const COOKIE_CONFIG: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',// esto sirve para que los cookies sean accesibles desde cualquier ruta
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
};

export const COOKIE_NAME = 'token';
