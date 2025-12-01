import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) { }

  @Post()
  @Roles('ADMIN')
  @UseGuards(AuthGuard,RolesGuard)
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtyService.create(createSpecialtyDto);
  }

  @Get()
  @Roles('USER')
  @UseGuards(AuthGuard, RolesGuard)
  getAll() {
    return this.specialtyService.getAll();
  }
  
  @Patch(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard,RolesGuard)
  update(@Param('id',ParseIntPipe) id: number, @Body() updateSpecialtyDto: UpdateSpecialtyDto) {
    return this.specialtyService.update(+id, updateSpecialtyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialtyService.remove(+id);
  }
}
