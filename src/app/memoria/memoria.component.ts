import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.scss'],
})
export class MemoriaComponent implements OnInit {
  public valores: Array<number>;
  constructor() { 
    this.valores = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
  }

  ngOnInit() {}

}
