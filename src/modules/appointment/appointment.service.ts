import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterAppointmentDto } from './dto/filter-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma:PrismaService){}


  async create(createAppointmentDto: CreateAppointmentDto,id:string) {    
    try{
      await this.prisma.appointment.create({ data: {
        notes: createAppointmentDto.notes,
        startTime: createAppointmentDto.startTime.replace(' ', 'T') + ':00.000Z',
        endTime: createAppointmentDto.endTime.replace(' ', 'T') + ':00.000Z',
        doctorId: createAppointmentDto.doctorId,
        userId: id
      }})
      return 'Cita creada correctamente'
    }catch(e){
      // console.log(e)  
      throw new HttpException('Error en la creación de la cita',HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getForDate(query:FilterAppointmentDto){
    const start = new Date(`${query.days} 00:00:00`);
    const end = new Date(`${query.days} 23:59:59`);
    const result=await this.prisma.appointment.findMany({
      where:{
        startTime:{
          gte:start,
          lte:end
        },
        doctorId:query.doctorId
      },
      
    })
    if(result.length===0){
      throw new HttpException('No existen fechas',HttpStatus.NOT_FOUND)
    }
    return result
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
