import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs';
import { IResponseLogin } from '../../../core/interface/IResponse.interface';
import { JwtService } from '../../../shared/services/jwt.service';
import { LoginForm } from '../interfaces/login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ RouterLink, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule ],
  providers: [ AuthService  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form!:FormGroup<LoginForm>
  loading!: boolean;

  constructor(
    private readonly authSvc: AuthService,
    private readonly jwtSvc: JwtService,
    private readonly router:Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup<LoginForm>({
        email: new FormControl('', { nonNullable: true, validators:[Validators.email, Validators.required, Validators.maxLength(40)] }),
        password: new FormControl('', { nonNullable: true, validators:[Validators.required, Validators.maxLength(20), Validators.minLength(8)] }),
    });
  }

  onSubmit(): void {
    this.loading = true;

    this.authSvc.login(this.form.value).pipe((finalize(() => this.loading = false))).subscribe((res:IResponseLogin) => {
      const { token } = res;
      this.jwtSvc.setterSettings(token);
      this.router.navigate(['/'])
    })
  }

}
