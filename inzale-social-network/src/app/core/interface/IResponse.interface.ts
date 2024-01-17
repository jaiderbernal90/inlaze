export interface IResponseLogin {
  token: string;
}


export interface IResponseRegister {
  token: string;
}

export interface IPagination{
  page: number;
  take: number;
  itemCount: number;
  pageCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  first?: number;
}
export interface IParamsPagination{
  page?: number;
  term?: string;
  take?: number;
}
export interface IResponsePagination<T>{
  meta: IPagination;
  data: T[];
}
export interface IResponseData<T>{
  message: string;
  data: T;
}
