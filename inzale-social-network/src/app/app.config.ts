import { ApplicationConfig } from '@angular/core';
import { Router, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [
    Router, JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    provideRouter(routes)
  ]
};
