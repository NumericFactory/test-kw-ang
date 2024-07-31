import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize',
  standalone: true
})
export class PluralizePipe implements PipeTransform {

  transform(value: number, word: string): string {
    return value === 1 ? `${value} ${word}` : `${value} ${word}s`;
  }

}
