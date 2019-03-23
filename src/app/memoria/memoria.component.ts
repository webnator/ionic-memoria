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
    // Si el numero es visible, no hacemos nada porque:
    // 1. Es el propio numero ya seleccionado antes
    // 2. Ya se acertó
    if (this.esVisible(index)) { return; }

    if (this.seleccionado === null) {
      this.seleccionado = index;
    } else {
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
    // Si se ha seleccionado deberia ser visible
    let visible = this.seleccionado === index;
    // Si se ha acertado deberia estar siempre visible
    visible = visible || this.aciertos.includes(index);
    return visible;
  }

}
