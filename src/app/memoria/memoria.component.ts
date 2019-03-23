import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.scss'],
})
export class MemoriaComponent implements OnInit {
  @Output() acertado: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() completado: EventEmitter<boolean> = new EventEmitter<boolean>();

  public valores: Array<number>;
  public aciertos: Array<number>;
  private parSeleccionado: Array<number> = new Array(2);
  constructor() { 
    this.valores = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    this.aciertos = [];
  }

  ngOnInit() {}

  public seleccionaValor(index: number): void {
    // Si el numero es visible, no hacemos nada porque:
    // 1. Es el propio numero ya seleccionado antes
    // 2. Ya se acertó
    if (this.esVisible(index)) { return; }

    if (this.parSeleccionado[0] === undefined) {
      this.parSeleccionado[0] = index;
    } else {
      if (this.valores[this.parSeleccionado[0]] === this.valores[index]) {
        // guardamos los indices de los valores que se han acertado
        this.aciertos.push(this.parSeleccionado[0]);
        this.aciertos.push(index);

        this.acertado.emit(true);
        this.compruebaJuegoTerminado();
      } else {
        this.acertado.emit(false);
      }
      this.parSeleccionado = [];
    }
  }

  public esVisible(index: number): boolean {
    // Si se ha seleccionado deberia ser visible
    let visible = this.parSeleccionado.includes(index);
    // Si se ha acertado deberia estar siempre visible
    visible = visible || this.aciertos.includes(index);
    return visible;
  }

  private compruebaJuegoTerminado(): void {
    // Si el numero de aciertos es igual al numero total de valores. El juego ha terminado
    if (this.aciertos.length === this.valores.length) {
      console.log('Juego terminado');
      this.completado.emit(true);
    }
  }

}
