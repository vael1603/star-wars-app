import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailCharacterComponent } from './components/detail-character/detail-character.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'character/:name', component: DetailCharacterComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
