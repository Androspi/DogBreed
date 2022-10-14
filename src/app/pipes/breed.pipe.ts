import { Pipe, PipeTransform } from '@angular/core';

import { StringUtility } from '../utilties/string.service';

@Pipe({ name: 'breed' })
export class BreedPipe implements PipeTransform {

  constructor(private stringUtility: StringUtility) { }

  /**
   * Get breed from image source
   * @param src Image source
   * @returns breed text
   */
  transform(src: string): string {
    const [, , , , id] = src.split('/');
    const [breed, subBreed] = id.split('-').map(item => this.stringUtility.capitalizeFirst(item ?? ''));
    return subBreed ? `${breed} - (${subBreed})` : breed;
  }

}
