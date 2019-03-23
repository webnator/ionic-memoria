import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public totalAciertos: number;
  public totalIntentos: number;

  constructor() {
    this.totalAciertos = 0;
    this.totalIntentos = 0;
  }

  public chequeaAciertos(acertado: boolean): void {
    if (acertado) {
      this.totalAciertos++;
    }
    this.totalIntentos++;
  }

  public terminaJuego(): void {
    alert(`Juego terminado. 
      Aciertos: ${this.totalAciertos}. 
      Intentos: ${this.totalIntentos}. 
      Efectividad: ${this.totalAciertos * 100 / this.totalIntentos}%
    `);
  }

}
