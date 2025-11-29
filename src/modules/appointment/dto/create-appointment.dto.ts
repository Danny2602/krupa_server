import { isString, IsString, IsUUID } from "class-validator"


export class CreateAppointmentDto {
    @IsString()
    notes?:string
    
    @IsString()
    startTime:string
    @IsString()
    endTime:string

    @IsUUID()
    doctorId:string
    userId?:string
}