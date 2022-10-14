import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'random' })
export class RandomPipe implements PipeTransform {

  /**
   * Generate a random number in a defined range
   * @param min start of range
   * @param max end of range
   * @returns random number
   */
  transform(min: number, max: number): number {
    return Math.floor((Math.random() * max) + min);
  }

}
