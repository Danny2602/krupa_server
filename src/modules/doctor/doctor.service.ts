import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorService {
constructor(private prisma:PrismaService) {
  
}

  create(createDoctorDto: CreateDoctorDto) {
    return 'This action adds a new doctor';
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
