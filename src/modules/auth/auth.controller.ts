import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './guards/auth/auth.guard';
import type { Response,Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/credentials')
  @HttpCode(200)
  async login(@Body() createAuthDto: CreateAuthDto ,@Res() res:Response) {
    console.log('controller:',createAuthDto)
    const result = await this.authService.login(createAuthDto);
    res.cookie('token', result.token,{ 
        httpOnly: true, 
        secure: false,// en local debe estar false 
        sameSite: 'lax' 
      });
      console.log(result)
    return res.json({
      message: result.message,
      user: result.user,      // opcional
      token: result.token,    // opcional
    });
  }

  @Get('check-status')
  @UseGuards(AuthGuard)
  async checkStatus(@Req() req: any) {
    console.log('req.user:',req.user);
    return await this.authService.checkStatus(req.user);
  }


}
