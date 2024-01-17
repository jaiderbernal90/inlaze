import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../../environments/environment.prod';
import { IResponseData, IResponseRegister } from '../../../core/interface/IResponse.interface';
import { Observable } from 'rxjs';
import { RegisterModel } from '../../auth/interfaces/register.interface';
import { IUser } from '../../../core/interface/IUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URI: string = environment.serverUrl;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
  ) { }


  public update(id:number,body: RegisterModel): Observable<IResponseRegister> {
    return this.http.put<IResponseRegister>(`${this.API_URI}/users/${id}`, body)
  }

  public findOne(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.API_URI}/users/${id}`)
  }

}
