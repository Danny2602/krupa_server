import { IsArray, IsString, Length, Max } from "class-validator"

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
    @IsString()
    biography? :string
    @IsArray()
    specialties?:number[]
}
