import { IsString, IsUUID } from "class-validator"

export class FilterAppointmentDto{
    @IsUUID()
    doctorId: string

    @IsString()
    days:string
}