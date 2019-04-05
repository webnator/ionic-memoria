import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IconService } from './icon.service';
import { ResultadoTurno } from './resultado-turno';

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.scss'],
})
export class MemoriaComponent implements OnInit {
  @Input() filas: number = 4;
  @Input() columnas: number = 4;
  @Input() jugadores: number = 1;
  @Input() prueba: boolean = false;
  @Output() acertado: EventEmitter<ResultadoTurno> = new EventEmitter<ResultadoTurno>();
  @Output() completado: EventEmitter<boolean> = new EventEmitter<boolean>();

  public valores: Array<number>;
  public aciertos: Array<number>;
  private jugadorActual: number;
  // Usamos un array para poder utilizar ngFor en el template
  public arrFilas: Array<number>;
  public arrCols: Array<number>;

  private parSeleccionado: Array<number> = new Array(2);

  constructor(private iconService: IconService) { }

  ngOnInit() {
    this.iniciaNuevoJuego();
  }

  public iniciaNuevoJuego(): void {
    this.jugadorActual = 0;
    this.arrFilas = new Array(this.filas);
    this.arrCols = new Array(this.columnas);
    this.valores = [];
    this.generaValores(this.filas, this.columnas);
    this.aciertos = [];
  }

  public obtieneIconoParaValor(index: number): string {
    return this.iconService.obtieneIcono(index);
  }

  private generaValores(filas: number, columnas: number): void {
    // Generamos los valores dependiendo del numero total de filas y columnas
    // Por ejemplo si tenemos 4 filas y 3 columnas (4x3=12), necesitamos 6 parejas de valores (6x2=12)
    const totalParejas = (filas * columnas) / 2;
    for (let i = 0; i < totalParejas; i++) {
      this.valores.push(i);
      this.valores.push(i);
    }
    // Si no es una prueba desordeno los valores
    if (this.prueba === false) {
      this.valores = this.shuffle(this.valores);
    }
  }

  // Obtenido de stackoverflow
  // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  private shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
    // Emite el evento para el jugador
    this.acertado.emit({ jugador: this.jugadorActual, acierto: haAcertado});
    if (haAcertado) {
      // guardamos los indices de los valores que se han acertado
      this.guardaAciertos();

      this.compruebaJuegoTerminado();
      this.limpiaParSeleccionado();
    } else {
      this.rotaJugador();
      // Damos unos segundos antes de limpiar los pares para que el usuario pueda ver el segundo valor
      this.limpiaParSeleccionado(1000);
    }
  }

  private rotaJugador() {
    this.jugadorActual++;
    if (this.jugadorActual >= this.jugadores) {
      this.jugadorActual = 0;
    }
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
