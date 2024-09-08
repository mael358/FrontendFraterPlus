import { Routes } from '@angular/router';
import { UserComponent } from './components/usuario/user/user.component';
import { UserFormComponent } from './components/usuario/form/user-form.component';

export const routes: Routes = 
[
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
    },
    {
        path: 'users',
        component: UserComponent
    },
    {
        path: 'users/create',
        component: UserFormComponent
    },
    {
        path: 'users/update/:id',
        component: UserFormComponent
    }
];
