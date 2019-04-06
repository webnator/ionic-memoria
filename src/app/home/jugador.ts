export class Jugador {
  private _nombre: string;
  private _aciertos: number;
  private _intentos: number;

  constructor(nombre: string) {
    this._nombre = nombre;
    this._aciertos = 0;
    this._intentos = 0;
  }

  get nombre() { return this._nombre };
  get aciertos() { return this._aciertos };
  get intentos() { return this._intentos };

  public terminaTurno(acierto: boolean): void {
    if (acierto) {
      this._aciertos++;
    }
    this._intentos++;
  }

}
