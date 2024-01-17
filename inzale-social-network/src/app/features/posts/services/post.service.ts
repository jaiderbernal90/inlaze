import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IParamsPagination, IResponseData, IResponsePagination } from '../../../core/interface/IResponse.interface';
import { IPost, IPostModel } from '../../../core/interface/IPost.interface';
import { headers } from '../../../core/utils/context-http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private headers: HttpHeaders = headers;
  API_URI: string = environment.serverUrl;

  constructor(
    private http: HttpClient,
    private _cookieSvc: CookieService,
  ) {}

  public findAll(query:IParamsPagination | null): Observable<IResponsePagination<IPost>> {

    let params = new HttpParams();

    params = params.set('take', query?.take ?? 10)
    params = params.set('page', query?.page ?? 1);

    return this.http.get<IResponsePagination<IPost>>(`${this.API_URI}/posts?${query}`, { params, headers: this.headers })
  }

  public findOne(id: number): Observable<IResponseData<IPost>> {
    return this.http.get<IResponseData<IPost>>(`${this.API_URI}/posts/${id}`)
  }

  public create(body: IPostModel): Observable<IResponseData<IPost>> {
    return this.http.post<IResponseData<IPost>>(`${this.API_URI}/posts`, body)
  }

  public delete(id: number): Observable<IResponseData<IPost>> {
    return this.http.delete<IResponseData<IPost>>(`${this.API_URI}/posts/${id}`)
  }
}
