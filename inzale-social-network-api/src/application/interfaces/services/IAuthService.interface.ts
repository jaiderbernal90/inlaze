import { LoginAuthDto } from "src/application/dto/auth/login-auth.dto";
import { RegisterAuthDto } from "src/application/dto/auth/register-auth.dto";

export const AUTH_SERVICE_TOKEN = 'AUTH_SERVICE_TOKEN';

export interface IAuthService {
    login(data:LoginAuthDto): Promise<number>;
    register(user: RegisterAuthDto): Promise<number>;
}