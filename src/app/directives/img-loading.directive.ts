import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[appImgLoading]' })
export class ImgLoadingDirective {

  /** shortcut to element */
  get target() {
    return this.elementRef.nativeElement;
  }

  /** shortcut to element parent */
  get parent() {
    return this.elementRef.nativeElement.parentElement as HTMLElement;
  }

  /** Add loading classes */
  constructor(private elementRef: ElementRef<HTMLImageElement>) {
    this.parent.classList.add('loading');
    this.target.classList.add('img-loading');
    this.parent.style.animationDelay = `${Math.floor((Math.random() * 175) + 25)}ms`;
    this.target.addEventListener('load', this.#removeLoader);
  }

  /** Delete de loading classes */
  #removeLoader = () => {
    this.parent.classList.remove('loading');
    this.target.classList.remove('img-loading');
  };

}
