import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.specialtyService.getOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecialtyDto: UpdateSpecialtyDto) {
    return this.specialtyService.update(+id, updateSpecialtyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialtyService.remove(+id);
  }
}
