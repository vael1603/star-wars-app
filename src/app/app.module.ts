import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DetailCharacterComponent } from './components/detail-character/detail-character.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxContextModule } from 'ngx-context'; 

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoaderComponent,
    DetailCharacterComponent,
    SearchBarComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSelectModule,
    NgxContextModule,
    FormsModule 
  ],
  providers: [LoaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
