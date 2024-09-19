import { Routes } from '@angular/router';
import { UserComponent } from './components/usuario/user/user.component';
import { UserFormComponent } from './components/usuario/form/user-form.component';
import { AuthComponent } from './components/auth/auth.component';
import { Forbidden403Component } from './components/forbidden403/forbidden403.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = 
[
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users/page/0'
    },
    {
        path: 'users',
        component: UserComponent,
        canActivate: [authGuard]
    },
    {
        path: 'users/page/:page',
        component: UserComponent,
        canActivate: [authGuard]
    },
    {
        path: 'users/create',
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'users/update/:id',
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: 'forbidden',
        component: Forbidden403Component
    }
];
