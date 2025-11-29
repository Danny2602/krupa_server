import { Controller, Get, Post, Body, Patch, Param, Delete, ParseDatePipe, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { queryObjects } from 'v8';
import { FilterAppointmentDto } from './dto/filter-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  getForDate(@Query() query:FilterAppointmentDto){
      return this.appointmentService.getForDate(query);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.appointmentService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
