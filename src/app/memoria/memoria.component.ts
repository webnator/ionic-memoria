import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IconService } from './icon.service';
import { ResultadoTurno } from './resultado-turno';
import { ValoresService } from './valores.service';
import { Juego } from './juego';

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
  @Output() jugador: EventEmitter<number> = new EventEmitter<number>();

  private juego: Juego;
  // Usamos un array para poder utilizar ngFor en el template
  public arrFilas: Array<number>;
  public arrCols: Array<number>;

  constructor(private iconService: IconService, private valoresService: ValoresService) { }

  ngOnInit() {
    this.iniciaNuevoJuego();
  }

  public iniciaNuevoJuego(): void {
    this.juego = new Juego(this.jugadores);
    this.juego.valores = this.valoresService.generaValores(this.filas, this.columnas, !this.prueba);
    this.juego.acertado.subscribe((acierto: ResultadoTurno) => this.acertado.emit(acierto));
    this.juego.completado.subscribe(() => {
      this.iniciaNuevoJuego();
      this.completado.emit(true);
    });
    this.juego.jugador.subscribe((jugadorActivo: number) => this.jugador.emit(jugadorActivo));

    this.arrFilas = new Array(this.filas);
    this.arrCols = new Array(this.columnas);
  }

  public obtieneIconoParaValor(index: number): string {
    return this.iconService.obtieneIcono(index);
  }

  public seleccionaValor(index: number): void {
    this.juego.seleccionaValor(index);
  }

  public esVisible(index: number): boolean {
    return this.juego.esVisible(index);
  }
}
