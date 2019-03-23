import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.scss'],
})
export class MemoriaComponent implements OnInit {
  @Output() acertado: EventEmitter<boolean> = new EventEmitter<boolean>();
  public valores: Array<number>;
  public aciertos: Array<number>;
  private seleccionado: number;
  constructor() { 
    this.valores = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    this.seleccionado = null;
    this.aciertos = [];
  }

  ngOnInit() {}

  public seleccionaValor(index: number): void {
    if (this.seleccionado === null) {
      this.seleccionado = index;
    } else {
      if (index === this.seleccionado) { return; }
      if (this.valores[this.seleccionado] === this.valores[index]) {
        // guardamos los indices de los valores que se han acertado
        this.aciertos.push(this.seleccionado);
        this.aciertos.push(index);

        this.acertado.emit(true);
      } else {
        this.acertado.emit(false);
      }
      this.seleccionado = null;
    }
  }

  public esVisible(index: number): boolean {
    return this.seleccionado === index;
  }

}
