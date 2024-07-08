import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }
  private borderColors: string [] = [];

  getRandomColor(): string {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getRandomColors(numberOfColors: number, opacity: number = 1): string[] {
    const colorsArray = [];
    for (let i = 0; i < numberOfColors; i++) {
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let e = 0; e < 6; e++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      this.borderColors.push(color);
      colorsArray.push(`rgba(${parseInt(color.substring(1, 3), 16)}, ${parseInt(color.substring(3, 5), 16)}, ${parseInt(color.substring(5, 7), 16)}, ${opacity})`);
    }
    return colorsArray;
  }

  getBorderColors(): string[] {
    return this.borderColors;
  }
}
