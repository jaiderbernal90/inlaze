import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconLogoutComponent } from '../../../shared/components/icon-logout/icon-logout.component';
import { JwtService } from '../../../shared/services/jwt.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ IconLogoutComponent, RouterLink, TitleCasePipe ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  fullname?:string = this._jwtSvc.getUserToken()?.fullname;
  age:number | undefined = this._jwtSvc.getUserToken()?.age;

  constructor (
    private readonly _jwtSvc:JwtService,
  ){}

  public handleLogout():void {
    this._jwtSvc.clearCookies();
    this._jwtSvc.isAuthenticated();
  }


}
