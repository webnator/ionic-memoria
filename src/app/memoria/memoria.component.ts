import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.scss'],
})
export class MemoriaComponent implements OnInit {
  @Input() filas: number = 4;
  @Input() columnas: number = 4;
  @Output() acertado: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() completado: EventEmitter<boolean> = new EventEmitter<boolean>();

  public valores: Array<number>;
  public aciertos: Array<number>;
  // Usamos un array para poder utilizar ngFor en el template
  public arrFilas: Array<number> = new Array(this.filas);
  public arrCols: Array<number> = new Array(this.columnas);

  private parSeleccionado: Array<number> = new Array(2);
  constructor() { 
    this.iniciaNuevoJuego();
  }

  ngOnInit() {}

  public iniciaNuevoJuego(): void {
    this.valores = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    this.aciertos = [];
  }

  public seleccionaValor(index: number): void {
    // Si el numero es visible, no hacemos nada porque:
    // 1. Es el propio numero ya seleccionado antes
    // 2. Ya se acertó
    // Si el par está lleno tampoco hacemos nada porque significa que los segundos que 
    // esperamos para limpiarlos aun no han transcurrido y puede llevar a errores
    if (this.esVisible(index) || this.parLleno()) { return; }

    if (this.parSeleccionado[0] === undefined) {
      this.parSeleccionado[0] = index;
    } else {
      this.parSeleccionado[1] = index;
    }
    // Solo compruebo el acierto si ya se ha seleccionado un par
    if (this.parLleno()) {
      this.chequeaAcierto();
    }
  }

  public esVisible(index: number): boolean {
    // Si se ha seleccionado deberia ser visible
    let visible = this.parSeleccionado.includes(index);
    // Si se ha acertado deberia estar siempre visible
    visible = visible || this.aciertos.includes(index);
    return visible;
  }

  private parLleno(): boolean {
    return this.parSeleccionado[0] !== undefined && this.parSeleccionado[1] !== undefined;
  }

  private compruebaJuegoTerminado(): void {
    // Si el numero de aciertos es igual al numero total de valores. El juego ha terminado
    if (this.aciertos.length === this.valores.length) {
      console.log('Juego terminado');
      this.completado.emit(true);
      this.iniciaNuevoJuego();
    }
  }

  private chequeaAcierto(): void {
    const haAcertado: boolean = this.haAcertado();
    if (haAcertado) {
      // guardamos los indices de los valores que se han acertado
      this.guardaAciertos();

      this.compruebaJuegoTerminado();
      this.limpiaParSeleccionado();
    } else {
      // Damos unos segundos antes de limpiar los pares para que el usuario pueda ver el segundo valor
      this.limpiaParSeleccionado(1000);
    }
    this.acertado.emit(haAcertado);
  }

  private haAcertado(): boolean {
    return this.valores[this.parSeleccionado[0]] === this.valores[this.parSeleccionado[1]];
  }

  private limpiaParSeleccionado(tiempo: number = 0): void {
    setTimeout(() => {
      this.parSeleccionado = [];
    }, tiempo);
  }

  private guardaAciertos(): void {
    this.aciertos.push(this.parSeleccionado[0]);
    this.aciertos.push(this.parSeleccionado[1]);
  }
}
