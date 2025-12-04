import { IsArray, IsString, Max } from "class-validator"

export class CreateDoctorDto {
    @IsString()
    name      :string
    @IsString()
    lastName  :string
    @IsString()
    email     :string
    @IsString()
    @Max(10,{message:'El telefono no puede tener mas de 10 caracteres'})
    tlf?       :string
    @IsString()
    biography? :string
    @IsString()
    photo?     :string
    @IsArray()
    specialties?:number[]
}
