import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../../models/Character';
import { Film } from '../../models/Film';
import { AppComponent } from '../../app.component';
import { Homeworld } from '../../models/Homeworld';
import { Specie } from '../../models/Specie';
import { Starship } from '../../models/Starship';

@Component({
  selector: 'app-detail-character',
  templateUrl: './detail-character.component.html',
  styleUrls: ['./detail-character.component.scss']
})
export class DetailCharacterComponent implements OnInit {
  
  charactersList: Character[];
  films: Film[];
  homeworlds: Homeworld[];
  character: Character;
  species: Specie[];
  starships: Starship[];
  isLoad: boolean;
  notFound: boolean;
  showAll = false;

  constructor(private route: ActivatedRoute, private appComponent:AppComponent) { }

  ngOnInit(): void {
    this.appComponent.isLoadEmitter$.subscribe( data => {
      this.filterCharacter();
    })
    setTimeout(() => {
      this.filterCharacter();
    }, 650);
  }

  filterCharacter() {
    let name = this.route.snapshot.paramMap.get('name');
    let arr = this.charactersList.filter( char => char.name == name);
    if( arr.length == 0) {
      this.isLoad = false;
      this.notFound = true
    } else {
      this.notFound = false
      this.isLoad = true
      this.character = arr[0];
      this.getHomeworld();
      this.getFilms();
      this.getSpecies();
      this.getstarships();
    }
    this.showAll = true
  }

  getFilms() {
    let arrFilms: Film[] = [];
    for( let i = 0; i < this.films.length; i++) {
      let index = this.character.films.indexOf(this.films[i].url);
      if(index != -1) { arrFilms = arrFilms.concat(this.films[i]) }
    }
    this.character.films = arrFilms;
  }

  getHomeworld() {
    let planets = this.homeworlds.filter( planet => planet.url == this.character.homeworld);
    this.character.homeworld = planets[0];
  }

  getSpecies() {
    let arrSpecies: Specie[] = [];
    for( let i = 0; i < this.species.length; i++) {
      let index = this.character.species.indexOf(this.species[i].url);
      if(index != -1) { arrSpecies = arrSpecies.concat(this.species[i]) }
    }
    this.character.species = arrSpecies;
  }

  getstarships() {
    let arrShips: Starship[] = [];
    for( let i = 0; i < this.starships.length; i++) {
      let index = this.character.starships.indexOf(this.starships[i].url);
      if(index != -1) { arrShips = arrShips.concat(this.starships[i]) }
    }
    this.character.starships = arrShips;
  }
}
