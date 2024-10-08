import { Routes } from '@angular/router';
import { UserComponent } from './components/usuario/user/user.component';
import { UserFormComponent } from './components/usuario/form/user-form.component';
import { AuthComponent } from './components/auth/auth.component';
import { Forbidden403Component } from './components/forbidden403/forbidden403.component';
import { authGuard } from './guards/auth.guard';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteFormComponent } from './components/clientes/cliente-form/cliente-form.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PedidoDetalleComponent } from './components/pedidos/pedido-detalle/pedido-detalle.component';
import { PedidoFormComponent } from './components/pedidos/pedido-form/pedido-form.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ComprasComponent } from './components/compras/compras.component';
import { CompraDetalleComponent } from './components/compras/compra-detalle/compra-detalle.component';
import { CompraFormComponent } from './components/compras/compra-form/compra-form.component';
import { FacturaDetalleComponent } from './components/facturas/factura-detalle/factura-detalle.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ProveedorFormComponent } from './components/proveedores/proveedor-form/proveedor-form.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticuloFormComponent } from './components/articulos/articulo-form/articulo-form.component';

export const routes: Routes = 
[
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pedidos/page/0'
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
        path: 'pedidos',
        component: PedidosComponent,
        canActivate: [authGuard]
    },
    {
        path: 'pedidos/page/:page',
        component: PedidosComponent,
        canActivate: [authGuard]
    },
    {
        path: 'pedidos/form',
        component: PedidoFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'pedidos/form/:clienteId',
        component: PedidoFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'pedidos/:id',
        component: PedidoDetalleComponent,
        canActivate: [authGuard]
    },
    {
        path: 'inventario',
        component: InventarioComponent,
        canActivate: [authGuard]
    },
    {
        path: 'inventario/page/:page',
        component: InventarioComponent,
        canActivate: [authGuard]
    },
    {
        path: 'compras',
        component: ComprasComponent,
        canActivate: [authGuard]
    },
    {
        path: 'compras/page/:page',
        component: ComprasComponent,
        canActivate: [authGuard]
    },
    {
        path: 'compras/form',
        component: CompraFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'compras/:id',
        component: CompraDetalleComponent,
        canActivate: [authGuard]
    },
    {
        path: 'facturas',
        component: FacturasComponent,
        canActivate: [authGuard]
    },
    {
        path: 'facturas/page/:page',
        component: FacturasComponent,
        canActivate: [authGuard]
    },
    {
        path: 'facturas/:id',
        component: FacturaDetalleComponent,
        canActivate: [authGuard]
    },
    {
        path: 'proveedores',
        component: ProveedoresComponent,
        canActivate: [authGuard]
    },
    {
        path: 'proveedores/page/:page',
        component: ProveedoresComponent,
        canActivate: [authGuard]
    },
    {
        path: 'proveedores/form',
        component: ProveedorFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'proveedores/form/:id',
        component: ProveedorFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'articulos',
        component: ArticulosComponent,
        canActivate: [authGuard]
    },
    {
        path: 'articulos/page/:page',
        component: ArticulosComponent,
        canActivate: [authGuard]
    },
    {
        path: 'articulos/form',
        component: ArticuloFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'articulos/form/:id',
        component: ArticuloFormComponent,
        canActivate: [authGuard]
    }
];
