import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { JwtService } from '../services/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(JwtService).isAuthenticated();
}
