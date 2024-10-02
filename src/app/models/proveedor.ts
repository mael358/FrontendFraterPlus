
export class Proveedor {

    id!: number;
    nombres!: string;
    direccion!: string;
    nit!: string;
    dpi!: string;
    telefono!: string;
    extension!: string;

    // Borrar estos campos
    correo!: string;

    constructor() {
        this.nombres = '';
        this.direccion = '';
        this.nit = '';
        this.dpi = '';
        this.telefono = '';
        this.extension = '';
        this.correo = '';
    }
}