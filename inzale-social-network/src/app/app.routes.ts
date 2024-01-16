import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'inicio',
  },
  {
    path: '**',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
];
