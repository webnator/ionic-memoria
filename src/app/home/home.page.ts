import { Component } from '@angular/core';
import { ResultadoTurno } from '../memoria/resultado-turno';
import { Jugador } from './jugador';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public totalJugadores: number;
  public jugadores: Array<Jugador> = [];
  public jugadorActual: Jugador;

  constructor() {
    this.totalJugadores = 4;
    this.inicializaJugadores();
  }

  private inicializaJugadores() {
    this.jugadores = [];
    for (let i = 0; i < this.totalJugadores; i++) {
      this.jugadores.push(new Jugador(`${i}`));
    }
    this.jugadorActual = this.jugadores[0];
  } 

  public chequeaAciertos(resultado: ResultadoTurno): void {
    this.jugadores[resultado.jugador].terminaTurno(resultado.acierto);
  }

  public terminaJuego(): void {
    this.alertaGanador();
    this.inicializaJugadores();
  }

  public cambiaJugador(index: number): void {
    this.jugadorActual = this.jugadores[index];
  }

  private alertaGanador(): void {
    const ganador: Jugador = this.encuentraGanador();
    alert(`Juego terminado. 
      Ganador: Jugador ${ganador.nombre}
      Aciertos: ${ganador.aciertos}. 
      Intentos: ${ganador.intentos}. 
      Efectividad: ${ganador.aciertos * 100 / ganador.intentos}%
    `);
  }

  private encuentraGanador(): Jugador {
    let ganador: Jugador = null;
    let maximosAciertos = 0;
    this.jugadores.forEach((jugador) => {
      if (maximosAciertos < jugador.aciertos) {
        ganador = jugador;
        maximosAciertos = jugador.aciertos;
      }
    });
    return ganador;
  }

}
