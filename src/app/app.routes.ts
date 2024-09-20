import { Routes } from '@angular/router';
import { UserComponent } from './components/usuario/user/user.component';
import { UserFormComponent } from './components/usuario/form/user-form.component';
import { AuthComponent } from './components/auth/auth.component';
import { Forbidden403Component } from './components/forbidden403/forbidden403.component';
import { authGuard } from './guards/auth.guard';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteFormComponent } from './components/clientes/cliente-form/cliente-form.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';

export const routes: Routes = 
[
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'clientes/page/0'
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
    },
    {
        path: 'clientes',
        component: ClientesComponent,
        canActivate: [authGuard]
    },
    {
        path: 'clientes/page/:page',
        component: ClientesComponent,
        canActivate: [authGuard]
    },
    {
        path: 'clientes/form',
        component: ClienteFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'clientes/form/:id',
        component: ClienteFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'facturas/form',
        component: FacturasComponent,
        canActivate: [authGuard]
    },
    {
        path: 'facturas/form/:clienteId',
        component: FacturasComponent,
        canActivate: [authGuard]
    },
    {
        path: 'pedidos/form/:clienteId',
        component: PedidosComponent,
        canActivate: [authGuard]
    },
];
