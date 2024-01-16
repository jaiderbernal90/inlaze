import { Body, Controller, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { IAuthService } from '../interfaces/services/IAuthService.interface';
import { LoginAuthDto } from '../dto/auth/login-auth.dto';
import { RegisterAuthDto } from '../dto/auth/register-auth.dto';

@Controller('auth')
export class AuthController {

    constructor(@Inject('AUTH_SERVICE_TOKEN') private readonly service: IAuthService) {}

    @Post('register')
    @UsePipes(new ValidationPipe({whitelist: true}))
    async registerUser(@Body() dto: RegisterAuthDto) {
        return await this.service.register(dto);
    }

    @Post('login')
    async loginUser(@Body() dto: LoginAuthDto) {
        return await this.service.login(dto);
    }

}
