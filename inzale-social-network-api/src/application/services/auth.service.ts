import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { IAuthService } from '../interfaces/services/IAuthService.interface';
import { LoginDto } from '../dto/auth/login.dto';
import { RegisterDto } from '../dto/auth/register.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import UserRepository from '../../infrastructure/database/repositories/user.repository';
import { IResponseToken } from '../interfaces/IResponseToken.interface';
import { compareHash } from '../utils/handleBcrypt';

@Injectable()
export class AuthService implements IAuthService {

    constructor(
        private readonly _jwtSvc: JwtService,
        private readonly _userRepository: UserRepository,
    ) { }

    public async login(dataLogin: LoginDto): Promise<IResponseToken> {
        const { email, password } = dataLogin;

        const findUser = await this._userRepository.findByEmail(email);
        const { id, fullname, age, password:passwordHash } = await findUser;

        if (!findUser) throw new NotFoundException('No existe un usuario con ese email');
        
        console.log('password -> ', password);
            // passwordHash);
            console.log('passwordHash -> ', passwordHash);
            
        
        const checkPassword = await compareHash(password, passwordHash);
        if (!checkPassword) throw new HttpException('Contraseña incorrecta', 403)

        const payload = { id, fullname, age }
        const token = this._jwtSvc.sign(payload);

        return { token }
    }


    public register(user: RegisterDto): Promise<number> {
        return;
    }
}
