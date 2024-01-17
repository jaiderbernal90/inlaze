import { FormControl } from "@angular/forms";
import { IUser } from "./IUser.interface";

export interface IPost {
  id: number;
  title: string;
  content: string;
  likes: number;
  created?: Date;
  updated?: Date;
  deletedAt?: Date;
  user:IUser;
}

export interface PostForm {
  title?: FormControl<string>;
  content?: FormControl<string>;
  likes?: FormControl<number>;
  user_id?:FormControl<number | undefined>;
}

export interface IPostModel {
  title?: string;
  content?: string;
  likes?: number;
  user_id?:number | undefined;
}
