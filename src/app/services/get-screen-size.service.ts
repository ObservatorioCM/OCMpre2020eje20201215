import { Injectable } from '@angular/core';
import { SCREEN_SIZE } from '../screen-size.enum';

@Injectable({
  providedIn: 'root'
})
export class GetScreenSizeService {
  // https://stackblitz.com/edit/angular-size?file=src%2Fapp%2Fsize-detector%2Fsize-detector.component.ts
  userScreenSize: string;

  constructor() { }
// XS Extra small devices (portrait phones, less than 576px)
// SM Small devices (landscape phones, 576px and up)
// MD Medium devices (tablets, 768px and up)
// LG Large devices (desktops, 992px and up)
// XL Extra large devices (large desktops, 1200px and up)

  public getIsMobileResolution(): string {
    // console.log(window.innerWidth);
    switch (true) {
      case (window.innerWidth <= 410):
        // Xiaomi Redmi Note 6 Pro. Jose Luis Moreno 400
        this.userScreenSize =  SCREEN_SIZE.XS1;
        break;
      case (window.innerWidth <= 576):
        // El Samsung Note 8 mio, dice que es una pantalla XS 419.
        // iPhone X = XS 375 Salen rayas negras en el menu inicial.
        this.userScreenSize =  SCREEN_SIZE.XS;
        break;
        case (window.innerWidth <= 710):
          // Xiaomi Redmi Note 6 Pro apaisado. Jose Luis Moreno 700
          this.userScreenSize =  SCREEN_SIZE.MD1;
          break;
      case (window.innerWidth <= 800):
          // El Samsung Note 8 mio, apaisado dice que es una pantalla MD 798.
        this.userScreenSize =  SCREEN_SIZE.SM;
        break;
      case (window.innerWidth <= 992):
        this.userScreenSize = SCREEN_SIZE.MD;
        break;
      case (window.innerWidth <= 1200):
        this.userScreenSize = SCREEN_SIZE.LG;
        break;
      case (window.innerWidth > 1201):
        // En mi portatil a pantalla completa = XL1920
        this.userScreenSize = SCREEN_SIZE.XL;
        break;
      default:
        // code block
    }
    return this.userScreenSize;
  }
  }

