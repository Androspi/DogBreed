import { Component, OnInit } from '@angular/core';
import { BreedService } from 'src/app/services/breed.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  selector: 'app-search',
})
export class SearchComponent implements OnInit {

  breeds: Record<string, string[]> = {};

  constructor(
    private $breed: BreedService
  ) { }

  ngOnInit(): void {
    this.$breed.all().subscribe(breeds => {
      this.breeds = breeds;
    });
  }

}
