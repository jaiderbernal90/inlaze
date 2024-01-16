import { IsString, IsNotEmpty, IsEmail, IsNumber, IsBoolean, IsInt, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsInt()
    likes: number;

    @IsInt()
    @IsNotEmpty()
    user_id: number;
}