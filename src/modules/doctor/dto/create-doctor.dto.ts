import { IsArray, IsString } from "class-validator"

export class CreateDoctorDto {
    @IsString()
    name      :string
    @IsString()
    lastName  :string
    @IsString()
    email     :string
    @IsString()
    tlf?       :string
    @IsString()
    biography? :string
    @IsString()
    photo?     :string
    @IsArray()
    specialties?:number[]
}
