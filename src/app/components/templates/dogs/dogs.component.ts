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

  loading = false;

  columns!: number;

  @HostListener('window:resize') calculateColumns() {
    this.columns = Math.floor(window.innerWidth / 420) || 1;
  }

  timer = 0;

  images: string[] = [];

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

  ngOnInit(): void {
    this.search.breeds.subscribe(() => {
      this.images = [];
      clearTimeout(this.timer);
      this.#getImages()
    });
  }

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
    }, 100);
  }

  toggleFullScreen(target: HTMLElement) {
    if (!document.fullscreenElement) {
      target.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

}
