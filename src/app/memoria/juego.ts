import { ResultadoTurno } from './resultado-turno';
import { Subject } from 'rxjs';

export class Juego {
  private _jugadores: number;
  private _jugadorActual: number;
  private _valores: Array<number>;
  private _aciertos: Array<number>;
  private _parSeleccionado: Array<number>;

  public acertado: Subject<ResultadoTurno> = new Subject<ResultadoTurno>();
  public jugador: Subject<number> = new Subject<number>();
  public completado: Subject<boolean> = new Subject<boolean>();

  constructor(totalJugadores: number) {
    this._jugadores = totalJugadores;
    this._jugadorActual = 0;
    this._parSeleccionado = new Array(2);
    this._aciertos = [];
  }

  set valores(valores: Array<number>) {
    this._valores = valores;
  }

  get valores(): Array<number> {
    return this._valores;
  }

  public seleccionaValor(index: number): void {
    // Si el numero es visible, no hacemos nada porque:
    // 1. Es el propio numero ya seleccionado antes
    // 2. Ya se acertó
    // Si el par está lleno tampoco hacemos nada porque significa que los segundos que 
    // esperamos para limpiarlos aun no han transcurrido y puede llevar a errores
    if (this.esVisible(index) || this.parLleno()) { return; }

    if (this._parSeleccionado[0] === undefined) {
      this._parSeleccionado[0] = index;
    } else {
      this._parSeleccionado[1] = index;
    }
    // Solo compruebo el acierto si ya se ha seleccionado un par
    if (this.parLleno()) {
      this.chequeaAcierto();
    }
  }

  public esVisible(index: number): boolean {
    // Si se ha seleccionado deberia ser visible
    let visible = this._parSeleccionado.includes(index);
    // Si se ha acertado deberia estar siempre visible
    visible = visible || this._aciertos.includes(index);
    return visible;
  }

  private parLleno(): boolean {
    return this._parSeleccionado[0] !== undefined && this._parSeleccionado[1] !== undefined;
  }

  private chequeaAcierto(): void {
    const haAcertado: boolean = this.haAcertado();
    // Emite el evento para el jugador
    this.acertado.next({ jugador: this._jugadorActual, acierto: haAcertado});
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
    this._jugadorActual++;
    if (this._jugadorActual >= this._jugadores) {
      this._jugadorActual = 0;
    }
    this.jugador.next(this._jugadorActual);
  }

  private haAcertado(): boolean {
    return this._valores[this._parSeleccionado[0]] === this._valores[this._parSeleccionado[1]];
  }

  private limpiaParSeleccionado(tiempo: number = 0): void {
    setTimeout(() => {
      this._parSeleccionado = [];
    }, tiempo);
  }

  private guardaAciertos(): void {
    this._aciertos.push(this._parSeleccionado[0]);
    this._aciertos.push(this._parSeleccionado[1]);
  }

  private compruebaJuegoTerminado(): void {
    // Si el numero de aciertos es igual al numero total de valores. El juego ha terminado
    if (this._aciertos.length === this._valores.length) {
      console.log('Juego terminado');
      this.completado.next(true);
      // this.iniciaNuevoJuego();
    }
  }

}
