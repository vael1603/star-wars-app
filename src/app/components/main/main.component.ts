import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  charactersList: Character[];
  isLoad: boolean;

  constructor( private appComponent: AppComponent ) {
  }

  ngOnInit(): void {
    this.appComponent.isLoadEmitter$.subscribe( data => {
      this.isLoad = data
    })

  }

}
