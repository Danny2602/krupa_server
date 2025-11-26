import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const password = bcrypt.hashSync(createUserDto.password, 10);

    const existingUser = await this.prisma.user.findUnique({ where: { email: createUserDto.email } });

    if (existingUser) {
      throw new HttpException(
        'El usuario ya existe',
        HttpStatus.CONFLICT,
      );
    }
    await this.prisma.user.create({ data: { ...createUserDto, password } });

    return {
      message: 'Usuario registrado correctamente'
    };
  }


  findAll() {
    return `This action returns all users`;
  }

  async getIdUser(id: string) {
    console.log(typeof id, `: ${id}`)
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const password = bcrypt.hashSync(updateUserDto.password, 10);
    const result = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto, password },
    });
    if (!result) {
      throw new HttpException(
        'El usuario no existe',
        HttpStatus.NOT_FOUND,
      );
    }
    return { message: 'Usuario actualizado correctamente' };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
