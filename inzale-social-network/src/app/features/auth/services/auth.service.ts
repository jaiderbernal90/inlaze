import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LoginModel } from '../interfaces/login.interface';
import { Router } from '@angular/router';
import { RegisterModel, UserTokenDecode } from '../interfaces/register.interface';
import { environment } from '../../../../environments/environment.prod';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IResponseLogin, IResponseRegister } from '../../../core/interface/IResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URI: string = environment.serverUrl;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private _cookieSvc: CookieService,
    private router: Router
  ) { }

  public login(body: LoginModel): Observable<IResponseLogin> {
    return this.http.post<IResponseLogin>(`${this.API_URI}/auth/login`, body)
  }

  public register(body: RegisterModel): Observable<IResponseRegister> {
    return this.http.post<IResponseRegister>(`${this.API_URI}/auth/register`, body)
  }

  public logout = () => {
    return this.http.post<any>(`${this.API_URI}/auth/logout`,{});
  }

}
