import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BreedItem } from './search.interface';
import { StringUtility } from 'src/app/utilties/string.utility';

@Injectable({ providedIn: 'root' })
export class SearchService {

  breeds = new BehaviorSubject<BreedItem[]>([]);
  searchControl = new FormControl('');

  get searchValue() {
    const { value } = this.searchControl;
    return StringUtility.trim(typeof value === 'string' ? value : value.text);
  }

}
