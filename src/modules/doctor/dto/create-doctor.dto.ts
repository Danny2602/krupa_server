import { Transform } from "class-transformer"
import { isArray, IsArray, IsNumber, IsString, Length, Max } from "class-validator"
import type { Express } from "express"
export class CreateDoctorDto {
    @IsString()
    name      :string
    @IsString()
    lastName  :string
    @IsString()
    email     :string
    @IsString()
    @Length(9,10,{message:'El telefono debe tener 9 o 10 digitos'})
    tlf?       :string
  
    photo?  :string
    @IsString()
    biography? :string
    @IsArray({message:'El doctor debe tener al menos un especialidad'})
    @Transform(({ value }) => {
            if (!value) return [];
            if (Array.isArray(value)) {
                return value.map((v) => Number(v));
        }
        return [Number(value)];
    })
    specialties?:number[]
}
