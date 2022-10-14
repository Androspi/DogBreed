import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PipesModule } from '../pipes/pipes.module';
import { MaterialModule } from './material.module';

import { SearchComponent } from './templates/search/search.component';
import { DogsComponent } from './templates/dogs/dogs.component';
import { DirectivesModule } from '../directives/directives.module';

const modules = [
  ReactiveFormsModule,
  HttpClientModule,
  DirectivesModule,
  MaterialModule,
  CommonModule,
  PipesModule,
];

const templates = [
  SearchComponent,
  DogsComponent
];

@NgModule({
  exports: [modules, templates],
  declarations: [templates],
  imports: [modules],
})
export class SharedModule { }
