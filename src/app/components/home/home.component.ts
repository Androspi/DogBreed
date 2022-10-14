import { Component } from '@angular/core';

import { SearchService } from '../templates/search/search.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  selector: 'app-home',
})
export class HomeComponent {

  constructor(public search: SearchService) { }

}
