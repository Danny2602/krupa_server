import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterAppointmentDto } from './dto/filter-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) { }

  async create(createAppointmentDto: CreateAppointmentDto, id: string) {
    try {
      await this.prisma.appointment.create({
        data: {
          notes: createAppointmentDto.notes,
          // Agregamos 'Z' para que Prisma lo trate como UTC y mantenga la hora exacta (ej: 10:00 se guarda como 10:00)
          startTime: createAppointmentDto.startTime.replace(' ', 'T') + 'Z',
          endTime: createAppointmentDto.endTime.replace(' ', 'T') + 'Z',
          doctorId: createAppointmentDto.doctorId,
          userId: id
        }
      })
      return '¡Cita Agendada Exitosamente!'
    } catch (e) {
      if (e.code === 'P2002') {
        const target = e.meta?.target;
        // Verificar si el error es por el doctor (ya tiene cita)
        if (target && target.includes('doctorId')) {
          throw new HttpException('El doctor ya tiene una cita agendada en este horario', HttpStatus.CONFLICT);
        }
        // Verificar si el error es por el usuario (ya tiene cita)
        if (target && target.includes('userId')) {
          throw new HttpException('Ya tienes una cita agendada en este horario', HttpStatus.CONFLICT);
        }
      }
      throw new HttpException('Error en la creación de la cita', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getForDate(query: FilterAppointmentDto) {
    const start = new Date(`${query.days} 00:00:00`);
    const end = new Date(`${query.days} 23:59:59`);
    const result = await this.prisma.appointment.findMany({
      where: {
        startTime: {
          gte: start,
          lte: end
        },
        doctorId: query.doctorId
      },

    })
    if (result.length === 0) {
      throw new HttpException('No existen fechas', HttpStatus.NOT_FOUND)
    }
    return result
  }

  async getForUser(id: string) {
    const [appointments, total, pending, canceled, completed] = await Promise.all([
      this.prisma.appointment.findMany({
        where: { userId: id }, orderBy: { startTime: 'asc' },
        include: {
          doctor: {
            select: {
              name: true, lastName: true, doctorSpecialty: {
                include: { specialty: { select: { name: true } } }
              }
            },
          }
        }
      }),
      this.prisma.appointment.count({
        where: { userId: id }
      }),
      this.prisma.appointment.count({
        where: { userId: id, status: 'PENDING' }
      }),
      this.prisma.appointment.count({
        where: { userId: id, status: 'CANCELED' }
      }),
      this.prisma.appointment.count({
        where: { userId: id, status: 'CONFIRMED' }
      })
    ]);
    // Transformar appointments para aplanar la estructura de los datos del doctor
    const formattedAppointments = appointments.map(apt => ({
      ...apt,
      startTime: apt.startTime.toISOString().slice(0, 19).replace('T', ' '),
      endTime: apt.endTime.toISOString().slice(0, 19).replace('T', ' '),
      doctor: {
        name: apt.doctor.name,
        lastName: apt.doctor.lastName,
        specialty: apt.doctor.doctorSpecialty[0]?.specialty.name || null
      }
    }));

    return {
      appointments: formattedAppointments,
      total,
      pending,
      canceled,
      completed
    };
  }

  async getAppointmentForDoctor(doctorId:string){
      const doctor=await this.prisma.appointment.findMany({
        where:{doctor:{UserId:doctorId}},include:{
          user:true
        }
      })
      if(!doctor){
        throw new HttpException(
          `Citas no encontradas`,
          HttpStatus.NO_CONTENT
        )
      }
      return doctor.map(apt=>{
        return{
          id:apt.id,
          name:apt.user.name,
          email:apt.user.email,
          notes:apt.notes,
          status:apt.status,
          startTime:apt.startTime,
          endTime:apt.endTime,
          type:'Cita Medica'
        }
      })
      
    }
}
