import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Factura } from '../../models/factura';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { flatMap, map, Observable } from 'rxjs';
import { Articulo } from '../../models/articulo';
import { ClientesService } from '../../services/cliente.service';
import { FacturaService } from '../../services/factura.service';
import { ArticuloService } from '../../services/articulo.service';
import { DetalleFactura } from '../../models/detalleFactura';
import Swal from 'sweetalert2';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MONEDA_LABEL } from '../../data/config';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, CommonModule, PaginatorComponent],
  templateUrl: './facturas.component.html'
})
export class FacturasComponent {
  paginator: any;
  pageUrl = '/facturas/page';
  page: number = 0;

  textoIngresado: string = "";

  facturas: Factura[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService,
    private router: Router) { }


  ngOnInit(): void {
    //Obtener facturas
    this.activatedRoute.paramMap.subscribe(params => {
      this.page = +(params.get('page') || '0');
      if (!this.page) {
        this.page = 0;
      }
      this.facturaService.obtenerFacturas(this.page, "").subscribe(
        response => {
          this.facturas = (response.content as Factura[])
          this.paginator = response;
        }
      );
    });
  }

  onTextInput(event: any): void {

  }

  delete(factura: Factura) {
    this.facturaService.delete(factura.id).subscribe(
      response => {
        this.facturas = this.facturas.filter(fa => fa !== factura);
      }
    );
  }
}
