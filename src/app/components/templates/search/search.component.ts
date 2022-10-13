import { Component, OnInit } from '@angular/core';

import { StringUtility } from 'src/app/utilties/string.utility';

import { BreedService } from 'src/app/services/breed.service';

import { Breed } from 'src/app/interfaces/breed.interface';
import { BreedItem } from './search.interface';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './search.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  selector: 'app-search',
})
export class SearchComponent implements OnInit {

  breeds: Breed = {};

  constructor(
    public service: SearchService,
    private route: ActivatedRoute,
    private $breed: BreedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.#getBreeds();
    this.#trackSearchControl();
  }

  #getBreeds() {
    this.$breed.all().subscribe(breeds => {
      this.breeds = breeds;
      this.#trackQueryParams();
    });
  }

  #trackSearchControl() {
    this.service.searchControl.valueChanges.subscribe(() => {
      this.router.navigate([], { relativeTo: this.route, queryParams: { breed: this.service.searchValue } });
    });
  }

  #trackQueryParams() {
    this.route.queryParams.subscribe(({ breed = '' }) => {
      this.service.searchControl.setValue({ text: breed }, { emitEvent: false });
      this.filterBreeds(breed);
    });
  }

  allBreeds() {
    const breeds: BreedItem[] = Object.keys(this.breeds).map(breed => ({
      text: StringUtility.capitalizeFirst(breed),
      id: breed
    }));

    const subBreeds: BreedItem[] = breeds.map(({ id, text }) => {
      return this.breeds[id].map(subBreed => ({
        text: `${text} - (${StringUtility.capitalizeFirst(subBreed)})`,
        id: `${id}/${subBreed}`,
      }));
    }).flat();

    return [...breeds, ...subBreeds];
  }

  filterBreeds(search: string) {
    this.service.breeds.next(this.allBreeds().filter(({ text }) => text.toLowerCase().includes(search.toLowerCase())));
  }

  displayBreed({ text }: BreedItem) {
    return text;
  }

  shuffle() {
    const breeds = this.allBreeds();
    const index = Math.floor(Math.random() * breeds.length);
    this.service.searchControl.setValue(breeds[index]);
  }

}
