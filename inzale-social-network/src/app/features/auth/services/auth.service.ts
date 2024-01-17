import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { LoginModel } from '../interfaces/login.interface';
import { RegisterModel } from '../interfaces/register.interface';
import { environment } from '../../../../environments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IResponseLogin, IResponseRegister } from '../../../core/interface/IResponse.interface';
import { skipApiKey } from '../../../shared/utils/http.context';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URI: string = environment.serverUrl;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
  ) { }

  public login(body: LoginModel): Observable<IResponseLogin> {
    return this.http.post<IResponseLogin>(`${this.API_URI}/auth/login`, body,  { context: skipApiKey() })
  }

  public register(body: RegisterModel): Observable<IResponseRegister> {
    return this.http.post<IResponseRegister>(`${this.API_URI}/auth/register`, body,  { context: skipApiKey() })
  }

  public logout = () => {
    return this.http.post<any>(`${this.API_URI}/auth/logout`,{});
  }

}
