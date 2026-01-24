import { UseInterceptors, UploadedFile, Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { CloundinaryService } from '../cloundinary/cloundinary.service';
import { get } from 'http';
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService,private cloudinaryService:CloundinaryService
    
  ) {}

  @Post()
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('photo'))
  @UseGuards(AuthGuard,RolesGuard)
  @HttpCode(201)
  async create(@Body() createDoctorDto: CreateDoctorDto,@UploadedFile() photo: Express.Multer.File) {
    try{
      const confirmed = await this.doctorService.validateCreate(createDoctorDto);
      if(!confirmed){
        throw new HttpException('Error en la creación',HttpStatus.INTERNAL_SERVER_ERROR)
      }
      const url = await this.cloudinaryService.uploadImage(photo,'doctor');
      const doctor ={
        ...createDoctorDto,
        photo:url as string
      };
        return await this.doctorService.create(doctor);
    }catch(e){
      throw e;
    }
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
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('photo'))
  async update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto,@UploadedFile() photo: Express.Multer.File) {
    if(photo){
      const doctor= await this.doctorService.getDoctorById(id);
      const url = await this.cloudinaryService.uploadImage(photo,'doctor');
      if(url){
        
        await this.cloudinaryService.deleteImage(doctor.photo as string);
      }
      updateDoctorDto.photo=url as string
    }
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
   
    return this.doctorService.remove(id);
  }
}
