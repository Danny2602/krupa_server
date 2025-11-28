import { Injectable } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SpecialtyService {
  constructor (private prisma:PrismaService){}
  create(createSpecialtyDto: CreateSpecialtyDto) {
    return 'This action adds a new specialty';
  }

  getAll() {
      return this.prisma.specialty.findMany();
  }

  getOne(id: number) {
    return `This action returns a #${id} specialty`;
  }

  update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    return `This action updates a #${id} specialty`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialty`;
  }
}
