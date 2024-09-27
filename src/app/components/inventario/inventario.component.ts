import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { Inventario } from '../../models/inventario';
import { InventarioService } from '../../services/inventario.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginatorComponent, MatFormFieldModule, MatAutocompleteModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './inventario.component.html'
})
export class InventarioComponent {

  articulos: Inventario[] = [];
  paginator: any;
  pageUrl = '/inventario/page';
  page: number = 0;
  textoIngresado: string = "";


  constructor(private inventarioService: InventarioService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.page = +(params.get('page') || '0');
      if (!this.page) {
        this.page = 0;
      }
    });
    this.inventarioService.obtenerInventario(this.page, "").subscribe(
      response => {
        this.articulos = (response.content as Inventario[])
        this.paginator = response;
      }
    );
  }

  onTextInput(event: any): void {
    this.textoIngresado = event.target.value;
    this.textoIngresado = this.textoIngresado ? this.textoIngresado : "";
    
    this.inventarioService.obtenerInventario(this.page, this.textoIngresado).subscribe(
      response => {
        this.articulos = (response.content as Inventario[])
        this.paginator = response;
      }
    );
  }
}
