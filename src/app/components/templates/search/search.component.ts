import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { StringUtility } from 'src/app/utilties/string.service';
import { BreedService } from 'src/app/services/breed.service';
import { SearchService } from './search.service';

import { Breed } from 'src/app/interfaces/breed.interface';
import { BreedItem } from './search.interface';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  selector: 'app-search',
})
export class SearchComponent implements OnInit {

  /** Breed list from Dog Api */
  breeds: Breed = {};

  constructor(
    private stringUtility: StringUtility,
    public service: SearchService,
    private route: ActivatedRoute,
    private $breed: BreedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.#getBreeds();
    this.#trackSearchControl();
  }

  /** get the breed list from the api  */
  #getBreeds() {
    this.$breed.all().subscribe(breeds => {
      this.breeds = breeds;
      this.#trackQueryParams();
    });
  }

  /** Update query params when input changes, to preserve text on reload */
  #trackSearchControl() {
    this.service.searchControl.valueChanges.subscribe(() => {
      this.router.navigate([], { relativeTo: this.route, queryParams: { breed: this.service.searchValue } });
    });
  }

  /** When the query parameters are updated, it filters the races that match  */
  #trackQueryParams() {
    this.route.queryParams.subscribe(({ breed = '' }) => {
      this.service.searchControl.setValue({ text: breed }, { emitEvent: false });
      this.filterBreeds(breed);
    });
  }

  /** create a breed list including sub-breeds */
  allBreeds() {
    const breeds: BreedItem[] = Object.keys(this.breeds).map(breed => ({
      text: this.stringUtility.capitalizeFirst(breed),
      id: breed
    }));

    const subBreeds: BreedItem[] = breeds.map(({ id, text }) => {
      return this.breeds[id].map(subBreed => ({
        text: `${text} - (${this.stringUtility.capitalizeFirst(subBreed)})`,
        id: `${id}/${subBreed}`,
      }));
    }).flat();

    return [...breeds, ...subBreeds];
  }

  /**
   * filter the races that match
   * @param search text to compare
   */
  filterBreeds(search: string) {
    this.service.breeds.next(this.allBreeds().filter(({ text }) => text.toLowerCase().includes(search.toLowerCase())));
  }

  /**
   * display the breed text on the input when the user chooses an option
   * @param param0 selected breed
   * @returns breed text
   */
  displayBreed({ text }: BreedItem) {
    return text;
  }

  /** choose a random breed */
  shuffle() {
    const breeds = this.allBreeds();
    const index = Math.floor(Math.random() * breeds.length);
    this.service.searchControl.setValue(breeds[index]);
  }

  blur() {
    setTimeout(() => {
      if (!(document.activeElement instanceof HTMLElement)) return;
      document.activeElement.blur();
    }, 0);
  }

}
