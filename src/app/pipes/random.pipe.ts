import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'random'
})
export class RandomPipe implements PipeTransform {

  transform(min: number, max: number): number {
    return Math.floor((Math.random() * max) + min);
  }

}
