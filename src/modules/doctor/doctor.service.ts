import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Specialty } from '../specialty/entities/specialty.entity';
import { spec } from 'node:test/reporters';

@Injectable()
export class DoctorService {
  constructor(private prisma:PrismaService) {
    
  }

  async create(createDoctorDto: CreateDoctorDto) {
    const {specialties=[],...doctorData}=createDoctorDto;
    const result = await this.prisma.doctor.create({data:{
      ...doctorData,
      doctorSpecialty:{
        create: specialties.map(specialtyId => ({
          specialtyId: specialtyId  
        }))
      }
    },include:{
      doctorSpecialty:{
          select:{specialty:{select:{name:true,color:true}}}
        }
    }})
    if(!result){
      throw new HttpException(
        `Problema al crear doctor`,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
    return result;
  }

  async getAll() {
    const result = await this.prisma.doctor.findMany({
      include:{
        doctorSpecialty:{
          select:{specialty:{select:{name:true,color:true}}}
        }
      }
    })
    if(!result){
      throw new HttpException(
        `Doctores no encontrados`,
        HttpStatus.NO_CONTENT
      )
    }
    return result
  }
  

  async getDoctorForSpecialty(id:number){
    const result=await this.prisma.doctor.findMany({
      where:{doctorSpecialty:{some:{specialtyId:id}}},// trae los datos del doctor
      include:{doctorSpecialty:{select:{specialty:{select:{name:true}}}}}// trae ademas que specialidad tiene
    })
    if(!result){
      throw new HttpException(
        `Doctores con especialidad no encontrados`,
        HttpStatus.NO_CONTENT
      )
        
      
    }
    return result
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
