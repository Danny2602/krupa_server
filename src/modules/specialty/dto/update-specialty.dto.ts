import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialtyDto } from './create-specialty.dto';
import { IsString } from 'class-validator';

export class UpdateSpecialtyDto extends PartialType(CreateSpecialtyDto) {
    @IsString()
    name?: string;
    @IsString()
    color?: string;
}
