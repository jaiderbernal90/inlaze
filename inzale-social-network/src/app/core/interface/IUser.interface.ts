export interface IUser {
  id: number;
  fullname: string;
  email: string;
  password?: string;
  age: number;
  created?: Date;
  updated?: Date;
  deletedAt?: Date;
}
