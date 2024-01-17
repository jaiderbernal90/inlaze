import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { loginGuard } from './shared/guards/login.guard';
import { LayoutComponent } from './core/components/layout/layout.component';
import { HomeComponent } from './core/components/home/home.component';
import { UserComponent } from './features/user/user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path:'',
    component:LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path:'inicio',
        component: HomeComponent,
      },
      {
        path:'perfil',
        component: UserComponent,
      }
    ]
  },
  {
    path:'iniciar-sesion',
    component: LoginComponent,
    canActivate: [ loginGuard ],
  },
  {
    path:'registro',
    component: RegisterComponent,
    canActivate: [ loginGuard ],
  },
  {
    path: '**',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
];
