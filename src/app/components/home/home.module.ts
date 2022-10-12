import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';

import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [HomeComponent],
})
export class HomeModule { }
