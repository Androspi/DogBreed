import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[appImgLoading]' })
export class ImgLoadingDirective {

  get target() {
    return this.elementRef.nativeElement;
  }

  get parent() {
    return this.elementRef.nativeElement.parentElement as HTMLElement;
  }

  constructor(
    private elementRef: ElementRef<HTMLImageElement>
  ) {
    this.parent.classList.add('loading');
    this.target.classList.add('img-loading');
    this.parent.style.animationDelay = `${Math.floor((Math.random() * 175) + 25)}ms`;
    this.target.addEventListener('load', this.#removeLoader);
  }

  #removeLoader = () => {
    this.parent.classList.remove('loading');
    this.target.classList.remove('img-loading');
  }

}
