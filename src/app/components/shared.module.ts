import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';

import { SearchComponent } from './templates/search/search.component';
import { DogsComponent } from './templates/dogs/dogs.component';

const modules = [
  ReactiveFormsModule,
  HttpClientModule,
  MaterialModule,
  CommonModule
];

const templates = [
  SearchComponent,
  DogsComponent
]

@NgModule({
  exports: [modules, templates],
  declarations: [templates],
  imports: [modules],
})
export class SharedModule { }
