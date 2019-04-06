import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValoresService {

  constructor() { }

  public generaValores(filas: number, columnas: number, desordena: boolean = true): Array<number> {
    let valores: Array<number> = [];
    // Generamos los valores dependiendo del numero total de filas y columnas
    // Por ejemplo si tenemos 4 filas y 3 columnas (4x3=12), necesitamos 6 parejas de valores (6x2=12)
    const totalParejas = (filas * columnas) / 2;
    for (let i = 0; i < totalParejas; i++) {
      valores.push(i);
      valores.push(i);
    }
    // Si no es una prueba desordeno los valores
    if (desordena) {
      valores = this.shuffle(valores);
    }
    return valores;
  }

  public generaValoresPares(pares: number, desordena: boolean = true): Array<number> {
    let valores: Array<number> = [];
    for (let i = 0; i < pares; i++) {
      valores.push(i);
      valores.push(i);
    }
    // Si no es una prueba desordeno los valores
    if (desordena) {
      valores = this.shuffle(valores);
    }
    return valores;
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
}
