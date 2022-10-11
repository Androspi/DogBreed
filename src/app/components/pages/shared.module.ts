import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';

import { SearchComponent } from '../templates/search/search.component';

const modules = [
  HttpClientModule,
  MaterialModule,
  CommonModule
];

const templates = [
  SearchComponent
]

@NgModule({
  imports: [modules],
  exports: [modules, templates],
  declarations: [templates],
})
export class SharedModule { }
