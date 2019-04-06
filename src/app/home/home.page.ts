import { Component } from '@angular/core';
import { ResultadoTurno } from '../memoria/resultado-turno';
import { ResultadoJugador } from './resultado-jugador';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public totalJugadores: number;
  public jugadores: Array<ResultadoJugador> = [];
  public jugadorActual: number;

  constructor() {
    this.totalJugadores = 4;
    this.inicializaJugadores();
  }

  private inicializaJugadores() {
    this.jugadores = [];
    this.jugadorActual = 0;
    for (let i = 0; i < this.totalJugadores; i++) {
      this.jugadores.push({
        aciertos: 0,
        intentos: 0
      })
    }
  } 

  public chequeaAciertos(resultado: ResultadoTurno): void {
    console.log(resultado);
    if (resultado.acierto) {
      this.jugadores[resultado.jugador].aciertos++;
    }
    this.jugadores[resultado.jugador].intentos++;
  }

  public terminaJuego(): void {
    this.alertaGanador();
    this.inicializaJugadores();
  }

  public cambiaJugador(index: number): void {
    this.jugadorActual = index;
  }

  private alertaGanador(): void {
    const indiceGanador = this.encuentraGanador();
    alert(`Juego terminado. 
      Ganador: Jugador ${indiceGanador + 1}
      Aciertos: ${this.jugadores[indiceGanador].aciertos}. 
      Intentos: ${this.jugadores[indiceGanador].intentos}. 
      Efectividad: ${this.jugadores[indiceGanador].aciertos * 100 / this.jugadores[indiceGanador].intentos}%
    `);
  }

  private encuentraGanador(): number {
    let ganador = null;
    let maximosAciertos = 0;
    this.jugadores.forEach((jugador, index) => {
      if (maximosAciertos < jugador.aciertos) {
        ganador = index;
        maximosAciertos = jugador.aciertos;
      }
    });
    return ganador;
  }

}
