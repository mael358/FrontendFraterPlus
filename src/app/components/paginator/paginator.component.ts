import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input()
  url: string = '';

  @Input()
  paginator: any = {};

  paginas: number[] = [];

  desde!: number;
  hasta!: number;

  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updatedPaginator = changes['paginator'];
    if (updatedPaginator.previousValue) {
      this.initPaginator();
    }
  }

  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5); // 6
    this.hasta = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6); // 10

    if (this.paginator.totalPages > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);   
      //this.paginas = new Array(this.paginator.totalPages).fill(0).map((_valor, indice) => indice + 1);
    } else {
      this.paginas = new Array(this.paginator.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }
  }


}
