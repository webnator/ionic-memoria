import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.scss'],
})
export class MemoriaComponent implements OnInit {
  public valores: Array<number>;
  private seleccionado: number;
  constructor() { 
    this.valores = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    this.seleccionado = null;
  }

  ngOnInit() {}

  public seleccionaValor(valor: number) {
    if (this.seleccionado === null) {
      this.seleccionado = valor;
    } else {
      if (this.seleccionado === valor) {
        alert('Conseguiste el par');
      }
      this.seleccionado = null;
    }
  }

}
