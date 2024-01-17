import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterForm } from '../auth/interfaces/register.interface';
import { finalize } from 'rxjs';
import { IResponseData, IResponseRegister } from '../../core/interface/IResponse.interface';
import { AuthService } from '../auth/services/auth.service';
import { JwtService } from '../../shared/services/jwt.service';
import { UserService } from './services/user.service';
import { IUser } from '../../core/interface/IUser.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  form!:FormGroup<RegisterForm>
  loading!: boolean;
  idUser:number | undefined = this.jwtSvc.getIdUserToken();

  constructor(
    private readonly userSvc: UserService,
    private readonly jwtSvc: JwtService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup<RegisterForm>({
        email: new FormControl('', { nonNullable: true, validators:[Validators.email, Validators.required, Validators.maxLength(40)] }),
        password: new FormControl('', { nonNullable: true, validators:[Validators.required, Validators.maxLength(20), Validators.minLength(8)] }),
        fullname: new FormControl('', { nonNullable: true, validators:[Validators.required, Validators.maxLength(80), Validators.minLength(8)] }),
        age: new FormControl(null, { nonNullable: true, validators:[Validators.required, Validators.min(18), Validators.max(100)] }),
    });

    this.getUser();
  }

  onSubmit(): void {
    this.loading = true;
    if(!this.idUser) return
    this.userSvc.update(this.idUser, this.form.value).pipe((finalize(() => this.loading = false))).subscribe((res:IResponseRegister) => {
      this.router.navigate(['/'])
    })

  }

  private getUser(): void {
    if(!this.idUser) return
    this.userSvc.findOne(this.idUser).subscribe((res:IUser) => {
      this.form.patchValue(res);
    })
  }

}
