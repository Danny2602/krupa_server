import { IsIn } from "class-validator"
export class UpdateStatusAppointmentDto {
    @IsIn(['PENDING', 'CONFIRMED', 'CANCELED', 'REJECTED'])
    status?:string
}