import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { Compra } from '../../models/compra';
import { ComprasService } from '../../services/compras.service';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, CommonModule, PaginatorComponent],
  templateUrl: './compras.component.html'
})
export class ComprasComponent {
  paginator: any;
  pageUrl = '/compras/page';
  page: number = 0;

  textoIngresado: string = "";

  compras: Compra[] = [];

  constructor(private comprasService: ComprasService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //Obtener compras
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.page = +(params.get('page') || '0');
      if (!this.page) {
        this.page = 0;
      }
      this.comprasService.obtenerCompras(this.page, "").subscribe(
        response => {
          this.compras = (response.content as Compra[])
          this.paginator = response;
        }
      );
    });
  }

  onTextInput(event: any): void {
    this.textoIngresado = event.target.value;
    this.textoIngresado = this.textoIngresado ? this.textoIngresado : "";
    
    this.comprasService.obtenerCompras(this.page, this.textoIngresado).subscribe(
      response => {
        this.compras = (response.content as Compra[])
        this.paginator = response;
      }
    );
  }

  delete(compra: Compra){
    this.comprasService.delete(compra.id).subscribe(
      response => {
        this.compras = this.compras.filter(cli => cli !== compra);
      }
    );
  }

  
}
