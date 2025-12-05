import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(AuthGuard,RolesGuard)
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @Roles('ADMIN')
  @UseGuards(AuthGuard,RolesGuard)
  getAll() {
    return this.doctorService.getAll();
  }


  @Get('specialty/:id')
  @HttpCode(200)
  @Roles('USER')
  @UseGuards(AuthGuard,RolesGuard)
  getDoctorForSpecialty(@Param('id',ParseIntPipe) id:number){
    return  this.doctorService.getDoctorForSpecialty(id)
  }

  @Patch(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard,RolesGuard)
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id)
    return this.doctorService.remove(id);
  }
}
