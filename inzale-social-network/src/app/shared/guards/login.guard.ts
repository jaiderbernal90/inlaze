import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';

export const loginGuard: CanActivateFn = (route, state) => inject(JwtService).hasExpiredToken();
