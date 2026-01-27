import { Controller, Get, Post, Body, Patch, Param, Delete, ParseDatePipe, Query, UseGuards, HttpCode } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { FilterAppointmentDto } from './dto/filter-appointment.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import * as client from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { UpdateStatusAppointmentDto } from './dto/update-status-appointment';


@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('USER')
  create(@Body() createAppointmentDto: CreateAppointmentDto,@GetUser() user:client.User) {
    return this.appointmentService.create(createAppointmentDto,user.id);
  }

  @Get()
  @UseGuards(AuthGuard)
  getForDate(@Query() query:FilterAppointmentDto){
      return this.appointmentService.getForDate(query);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  getForUser(@GetUser() user:client.User) {
    return this.appointmentService.getForUser(user.id);
  }

  @Get('/doctor')
  @Roles('DOCTOR')
  @HttpCode(200)
  @UseGuards(AuthGuard,RolesGuard)
  getForDoctor(@GetUser() user: client.Doctor) {
    return this.appointmentService.getAppointmentForDoctor(user.id);
  }
  @Patch(':id/status')
  @HttpCode(200)
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('DOCTOR')
  updateForStatus(@Param('id') id: string, @Body() updateStatusAppointmentDto: UpdateStatusAppointmentDto) {
    return this.appointmentService.updateForStatus(id,updateStatusAppointmentDto);
  }


}
