import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private iconList: Array<string>;
  constructor() { 
    this.iconList = [
      'airplane',
      'alarm',
      'american-football',
      'analytics',
      'aperture',
      'appstore',
      'at',
      'attach',
      'baseball',
      'basket',
      'basketball',
      'bed',
      'beer',
      'bicycle',
      'boat',
      'body',
      'bonfire',
      'bowtie',
      'briefcase',
      'bug',
      'bulb',
      'build',
      'bus',
      'cafe',
      'camera',
      'cart',
      'cash',
      'clock',
      'cog',
      'easel',
      'female',
      'fitness',
      'football',
      'glasses',
      'globe',
      'hammer',
      'hand',
      'happy',
      'headset',
      'heart',
      'heart-half',
      'ice-cream',
      'jet',
      'male',
      'paw',
      'pizza',
      'planet',
      'rocket',
      'rose',
      'snow',
      'transgender',
      'trophy',
      'umbrella',
      'watch',
      'wine'
    ]
    this.iconList = this.shuffle(this.iconList);
  }

  public obtieneIcono(index: number): string {
    return this.iconList[index];
  }

  // Obtenido de stackoverflow
  // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  private shuffle(a: Array<any>): Array<any> {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
