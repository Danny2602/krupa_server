import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';
import { IsArray, IsString, Length, Max, Min } from 'class-validator';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
    @IsString()
    name?      :string
    @IsString()
    lastName?  :string
    @IsString()
    email?     :string
    @IsString()
    @Length(9,10,{message:'El telefono no puede tener mas de 10 caracteres'})
    tlf?       :string
    @IsString()
    biography? :string
    @IsString()
    photo?     :string
    @IsArray()
    specialties?:number[]
}
