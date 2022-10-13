import { NgModule } from '@angular/core';

import { MasonryPipe } from './masonry.pipe';
import { BreedPipe } from './breed.pipe';
import { RandomPipe } from './random.pipe';
import { ArrayPipe } from './array.pipe';

const pipes = [
    MasonryPipe,
    RandomPipe,
    ArrayPipe,
    BreedPipe
]

@NgModule({
    declarations: pipes,
    exports: pipes
})
export class PipesModule { }
