import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { UserTokenDecode } from '../../features/auth/interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(
    public jwtHelper: JwtHelperService,
    private _cookieSvc: CookieService,
    private router: Router
  ) { }


  public isAuthenticated(): boolean {
    const hasSessionActive = this.verifyToken();
    if(!hasSessionActive) this.router.navigate([ '/','iniciar-sesion']);
    return hasSessionActive;
  }

  public hasExpiredToken(): boolean {
    const hasExpired = this.verifyToken();
    if(hasExpired) this.router.navigate(['/'])
    return !hasExpired;
  }

  public verifyToken(): boolean {
    const token = this.getCookie('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getUserToken(): UserTokenDecode | null {
    const token = this.getCookie('token');
    return this.jwtHelper.decodeToken(token);
  }

  public setterSettings = (token: string): void => this._cookieSvc.set('token', token, 2,'/');
  public clearCookies = ():void => this._cookieSvc.delete('token');
  public getCookie = (key:string) => this._cookieSvc.get(key);

}
