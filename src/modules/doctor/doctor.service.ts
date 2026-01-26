import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class DoctorService {
  constructor(private prisma:PrismaService) {
    
  }

  async validateCreate(createDoctorDto: CreateDoctorDto) {
    const { specialties = [], ...doctorData } = createDoctorDto;

    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.doctor.create({
          data: {
            ...doctorData,
            doctorSpecialty: {
              create: specialties.map(specialtyId => ({
                specialtyId: Number(specialtyId)
              }))
            }
          }
        });
        throw new Error('VALIDATION_PASSED_ROLLBACK');
      });
    } catch (e) {
      if (e.message === 'VALIDATION_PASSED_ROLLBACK') {
        return true; 
      }
      if (e.code === 'P2002') {
        throw new HttpException(`El email ${createDoctorDto.email} ya está en uso.`, HttpStatus.BAD_REQUEST);
      }
      if (e.code === 'P2003') {
        throw new HttpException(`Uno de los datos relacionados (ej. especialidad) no existe.`, HttpStatus.BAD_REQUEST);
      }
      throw e;
    }
  }

  async create(createDoctorDto: CreateDoctorDto) {
    const {specialties=[],...doctorData}=createDoctorDto;
      try{
        const result = await this.prisma.doctor.create({data:{
          ...doctorData,
          doctorSpecialty:{
            create: specialties.map(specialtyId => ({
              specialtyId: Number(specialtyId)  
            }))
          }
        },include:{
          doctorSpecialty:{
              select:{specialty:{select:{id:true,name:true,color:true}}}
            }
      }})
      if(!result){
        throw new HttpException(
          `Problema al crear doctor`,
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      }
      return result;
      }catch(e){
        throw e
    }
    
  }

  async getAll() {
    const result = await this.prisma.doctor.findMany({
      where:{isActive:true},
      include:{
        doctorSpecialty:{
          select:{specialty:{select:{id:true,name:true,color:true}}}
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
      where:{doctorSpecialty:{some:{specialtyId:id}}, isActive:true},
      // trae los datos del doctor
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

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    const {specialties=[],...doctorData}=updateDoctorDto;
    const result = await this.prisma.doctor.update({
      where:{id:id},
      data:{
        ...doctorData,
        doctorSpecialty:{
          deleteMany:{},// borra todas las especialidades del doctor en una sola consulta
          create: specialties.map(specialtyId => ({
            specialtyId: Number(specialtyId)
          }))
        }
      },
      include:{
        doctorSpecialty:{
          select:{specialty:{select:{id:true,name:true,color:true}}}
        }
    }})
    if(!result){
      throw new HttpException(
        `Problema al actualizar doctor`,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
    return result;
  }
  

  async remove(id: string) {
    const result= await this.prisma.doctor.update({
      where:{id:id},
      data:{
        isActive:false
      }
    })
    if(!result){
      throw new HttpException(
        `Problema al eliminar doctor`,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
    return 'Doctor Eliminado';
  }


  async getDoctorById(id:string){
    const doctor=await this.prisma.doctor.findUnique({
      where:{id:id}
    })
    if(!doctor){
      throw new HttpException(
        `Doctor no encontrado`,
        HttpStatus.NO_CONTENT
      )
    }
    return doctor
  }

  
}
