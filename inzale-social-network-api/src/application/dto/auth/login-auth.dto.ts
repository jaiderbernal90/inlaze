
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, maxLength } from 'class-validator';

export class LoginAuthDto {
    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password?: string;
}