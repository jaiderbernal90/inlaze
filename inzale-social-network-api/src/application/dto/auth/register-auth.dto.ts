
import { IsInt, IsNotEmpty } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';
import { PartialType } from '@nestjs/swagger';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @IsNotEmpty()
    fullname?: string;

    @IsInt()
    @IsNotEmpty()
    age?: number;
}