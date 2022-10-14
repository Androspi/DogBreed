import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'array' })
export class ArrayPipe implements PipeTransform {

  /**
   * Create an array
   * @param length length of array
   * @returns arary
   */
  transform(length: number): undefined[] {
    return Array.from({ length });
  }

}
