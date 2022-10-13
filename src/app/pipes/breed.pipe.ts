import { Pipe, PipeTransform } from '@angular/core';

import { StringUtility } from '../utilties/string.utility';

@Pipe({
  name: 'breed'
})
export class BreedPipe implements PipeTransform {

  transform(src: string): string {
    const [, , , , id] = src.split('/');
    const [breed, subBreed] = id.split('-').map(item => StringUtility.capitalizeFirst(item ?? ''));
    return subBreed ? `${breed} - (${subBreed})` : breed;
  }

}
