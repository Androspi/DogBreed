import { NgModule } from '@angular/core';

import { ImgLoadingDirective } from './img-loading.directive';

const directives = [
    ImgLoadingDirective
];

@NgModule({
    declarations: directives,
    exports: directives
})
export class DirectivesModule { }
