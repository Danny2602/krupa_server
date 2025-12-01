import { IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    email     :string
    @IsString()
    password  :string
    @IsString()
    tlf?       :string
    @IsString()
    googleId?  :string
    @IsString()
    name      :string
    @IsString()
    avatar?    :string

}
