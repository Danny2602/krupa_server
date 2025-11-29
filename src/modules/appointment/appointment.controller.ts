import { Controller, Get, Post, Body, Patch, Param, Delete, ParseDatePipe, Query, UseGuards, HttpCode } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { FilterAppointmentDto } from './dto/filter-appointment.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import * as client from '@prisma/client';


@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
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
