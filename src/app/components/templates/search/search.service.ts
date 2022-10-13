import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StringUtility } from 'src/app/utilties/string.service';

import { BreedItem } from './search.interface';

@Injectable({ providedIn: 'root' })
export class SearchService {

  breeds = new BehaviorSubject<BreedItem[]>([]);
  searchControl = new FormControl('');

  constructor(
    private stringUtility: StringUtility
  ) { }

  get searchValue() {
    const { value } = this.searchControl;
    return this.stringUtility.trim(typeof value === 'string' ? value : value.text);
  }

}
