import { Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/services/IAuthService.interface';
import { LoginAuthDto } from '../dto/auth/login-auth.dto';
import { RegisterAuthDto } from '../dto/auth/register-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
    
    constructor(
        private readonly jwtService: JwtService,
    ){}

    public login(data: LoginAuthDto): Promise<number> {
        return;
    }
    

    public register(user: RegisterAuthDto): Promise<number> {
        return;
    }
}
