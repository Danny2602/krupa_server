import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import type { Request } from 'express';
import * as client from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Roles('USER')
  getIdUser(@GetUser() user: client.User) {
    return this.usersService.getIdUser(user.id);
  }

  @Patch('profile')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  patch(@GetUser() user: client.User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
