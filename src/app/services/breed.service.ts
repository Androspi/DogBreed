import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  constructor(
    private http: HttpClient
  ) { }

  all() {
    return this.http.get<Record<string, string[]>>(`${environment.dogApi}breeds/list/all`);
  }

  list(breed: string) {
    return this.http.get<string[]>(`${environment.dogApi}breed/${breed}/images`);
  }

}
