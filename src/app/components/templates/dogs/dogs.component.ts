import { Component, HostListener, OnInit } from '@angular/core';

import { BreedService } from 'src/app/services/breed.service';
import { SearchService } from '../search/search.service';
import { DogsService } from './dogs.service';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss']
})
export class DogsComponent implements OnInit {

  /** The system is looking for images */
  loading = false;
  /** Number of images per row */
  columns!: number;

  /** update the number of images per row according to device width */
  @HostListener('window:resize') calculateColumns() {
    this.columns = Math.floor(window.innerWidth / 420) || 1;
  }

  /** Breed request timeout instance */
  timer = 0;

  /** Dogs */
  images: string[] = [];

  /** shortcut to breed list */
  get breeds() {
    return this.search.breeds.value;
  }

  constructor(
    private search: SearchService,
    private service: DogsService,
    private $breed: BreedService,
  ) {
    this.calculateColumns();
  }

  /** updates the list of images when the user filters the races */
  ngOnInit(): void {
    this.search.breeds.subscribe(() => {
      this.images = [];
      clearTimeout(this.timer);
      this.#getImages();
    });
  }

  /** search for dog images on Dog Api or storage */
  #getImages() {
    if (!this.breeds.length) return;
    const { id } = this.breeds[0];

    if (this.service.images.has(id)) {
      this.images = this.service.images.get(id)!;
      return;
    }

    this.loading = true;

    this.timer = window.setTimeout(() => {
      this.$breed.list(id).subscribe(images => {
        this.loading = false;
        this.service.images.set(id, images);
        this.images = images;
      });
    }, 100); /** wait for the user to finish typing  */
  }

  /**
   * Toggle image on fullscreen 
   * @param target Selected image
   */
  toggleFullScreen(target: HTMLElement) {
    if (!document.fullscreenElement) {
      target.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

}
