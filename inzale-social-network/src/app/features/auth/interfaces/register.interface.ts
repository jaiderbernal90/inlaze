import { FormControl } from "@angular/forms";

export interface RegisterModel {
  email?:string;
  fullname?:string;
  password?:string;
  age?:number | null;
}

export interface RegisterForm {
  fullname?:FormControl<string>;
  age?: FormControl<number | null>;
  email?: FormControl<string>;
  password?: FormControl<string>;
}

export interface UserTokenDecode {
  id?: number;
  fullname?: string;
  age?: string;
}
