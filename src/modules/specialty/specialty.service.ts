import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SpecialtyService {
  constructor (private prisma:PrismaService){}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    console.log(createSpecialtyDto)
    try{
      await this.prisma.specialty.create({data:createSpecialtyDto})
      return {message:'Especialidad creada Correctamente'}
    } catch (error) {
      
      throw new HttpException('Error en la creación',HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    try{
        await this.prisma.specialty.update({
        where: {
          id: id,
        },
        data: updateSpecialtyDto,
      });
      return {message:'Especialidad actualizada Correctamente'}
    }catch{
      throw new HttpException('Error en la actualización',HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  getAll() {
      return this.prisma.specialty.findMany();
  }

  getOne(id: number) {
    return `This action returns a #${id} specialty`;
  }


  remove(id: number) {
    return `This action removes a #${id} specialty`;
  }
}
