import { Component } from '@angular/core';
import { ResultadoTurno } from '../memoria/resultado-turno';
import { Jugador } from './jugador';
import { JugadoresService } from '../jugadores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego',
  templateUrl: 'juego.page.html',
  styleUrls: ['juego.page.scss'],
})
export class JuegoPage {
  public jugadores: Array<Jugador> = [];
  public jugadorActual: Jugador;

  constructor(private jugadoresService: JugadoresService, private router: Router) {
    this.inicializaJugadores();
  }

  private inicializaJugadores() {
    this.jugadores = this.jugadoresService.jugadores;
    if (this.jugadores.length <= 0) {
      this.router.navigate(['/inicio']);
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
