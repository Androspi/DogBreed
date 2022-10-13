import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appImgLoading]'
})
export class ImgLoadingDirective {

  get target() {
    return this.elementRef.nativeElement;
  }

  constructor(
    private elementRef: ElementRef<HTMLImageElement>
  ) {
    this.target.classList.add('img-loading');
    this.target.addEventListener('load', this.#removeLoader);
  }

  #removeLoader = () => {
    setTimeout(() => this.target.classList.remove('img-loading'), 300);
  }

}
