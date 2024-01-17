import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { JwtService } from './app/shared/services/jwt.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { importProvidersFrom } from '@angular/core';
import { LoggingInterceptor } from './app/shared/interceptors/token.interceptor';

bootstrapApplication(AppComponent,
  {
    providers:[
      provideRouter(routes),
      JwtService,
      JwtHelperService,
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      CookieService,
      importProvidersFrom(HttpClientModule),
      provideHttpClient(
        withInterceptorsFromDi(),
      ),

      {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    ],
  } )
