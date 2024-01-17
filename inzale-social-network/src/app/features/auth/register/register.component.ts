import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register.interface';
import { JwtService } from '../../../shared/services/jwt.service';
import { finalize } from 'rxjs';
import { IResponseRegister } from '../../../core/interface/IResponse.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ RouterLink, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule ],
  providers: [ AuthService ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form!:FormGroup<RegisterForm>
  loading!: boolean;

  constructor(
    private readonly authSvc: AuthService,
    private readonly jwtSvc: JwtService,
    private readonly router:Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup<RegisterForm>({
        email: new FormControl('', { nonNullable: true, validators:[Validators.email, Validators.required, Validators.maxLength(40)] }),
        password: new FormControl('', { nonNullable: true, validators:[Validators.required, Validators.maxLength(20), Validators.minLength(8)] }),
        fullname: new FormControl('', { nonNullable: true, validators:[Validators.required, Validators.maxLength(80), Validators.minLength(8)] }),
        age: new FormControl(null, { nonNullable: true, validators:[Validators.required, Validators.min(18), Validators.max(100)] }),
    });
  }

  onSubmit(): void {
    this.loading = true;

    this.authSvc.register(this.form.value).pipe((finalize(() => this.loading = false))).subscribe((res:IResponseRegister) => {
      this.router.navigate(['/','iniciar-sesion'])
    })
  }

}
