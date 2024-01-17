import { FormControl } from "@angular/forms";

export interface LoginModel {
  email?:string | undefined;
  password?:string | undefined;
}

export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
