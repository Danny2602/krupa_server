import { Controller, Get, Post, Body, Req, Res, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { COOKIE_CONFIG, COOKIE_NAME } from './constants/cookie-config';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Login con credenciales (email y password)
   */
  @Post('/credentials')
  @HttpCode(200)
  async login(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    const result = await this.authService.login(createAuthDto);

    // Configurar cookie con el token
    res.cookie(COOKIE_NAME, result.token, COOKIE_CONFIG);

    return res.json({
      message: result.message,
      user: result.user,
      token: result.token,
    });
  }

  /**
   * Verificar el estado de autenticación del usuario
   */
  @Get('check-status')
  @UseGuards(AuthGuard)
  async checkStatus(@Req() req: any) {
    return await this.authService.checkStatus(req.user);
  }

  /**
   * Cerrar sesión (limpiar cookie)
   */
  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return res.json({ message: 'Logout exitoso' });
  }

  /**
   * Iniciar autenticación con Google OAuth
   * Redirige automáticamente a Google para que el usuario autorice
   */
  @Get('google')
  @UseGuards(PassportAuthGuard('google'))
  async googleAuth() {
    // El Guard redirige automáticamente a Google
    // Este método nunca se ejecuta, pero es necesario para la ruta
  }

  /**
   * Callback de Google OAuth
   * Google redirige aquí después de que el usuario autoriza
   */
  @Get('google/callback')
  @UseGuards(PassportAuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    try {
    if (!req.user) {
      return res.status(401).json({ message: 'Error en autenticación con Google' });
    }

    // Validar y procesar el usuario de Google
    const result = await this.authService.validateGoogleUser(req.user as any);

    // Configurar cookie con el token (igual que el login normal)
    res.cookie(COOKIE_NAME, result.token, COOKIE_CONFIG);

    // Redirigir al frontend
    const frontendUrl = process.env.FRONTEND_URL;
    if(result.user.role == "USER"){
      return res.redirect(`${frontendUrl}/user/home`);
    }else{
      return res.redirect(`${frontendUrl}/doctor/home`);
    }
    // return res.redirect(`${frontendUrl}/user/home`);
    } catch (error) {
      console.log('Error en la validación de Google User', error);
      return res.status(401).json({ message: 'Error en la validación de Google User' });
    }
  }
}