import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DogsService {

  /** stores the image list by breed */
  images = new Map<string, string[]>();

}
