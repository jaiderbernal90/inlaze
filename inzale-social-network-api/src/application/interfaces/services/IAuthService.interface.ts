import { LoginDto } from "src/application/dto/auth/login.dto";
import { RegisterDto } from "src/application/dto/auth/register.dto";
import { IResponseToken } from "../IResponseToken.interface";

export const AUTH_SERVICE_TOKEN = 'AUTH_SERVICE_TOKEN';

export interface IAuthService {
    login(data:LoginDto): Promise<IResponseToken>;
    register(user: RegisterDto): Promise<number>;
}