import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { NO_API_KEY } from '../utils/http.context';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    const token = inject(JwtService).getCookie('token');
    if (req.context.get(NO_API_KEY)) {
        return handler.handle(req);
    }
    const requestApiKey = req.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
    return handler.handle(requestApiKey);
  }
}
