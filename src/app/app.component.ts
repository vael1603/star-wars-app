import { Component, EventEmitter } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { StarWarsService } from './services/star-wars.service';
import { MatDialog } from '@angular/material/dialog';
import { Character } from './models/Character';
import { Homeworld } from './models/Homeworld';
import { Router } from '@angular/router';
import { Film } from './models/Film';
import { Starship } from './models/Starship';
import { Specie } from './models/Specie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'star-wars-app';
  charactersList: Character[] = [];
  originalList: Character[] = [];
  homeworlds: Homeworld[] = [];
  species: Specie[] = [];
  films: Film[] = [];
  starships: Starship[] = [];

  isLoadEmitter$ = new EventEmitter<boolean>()
  isLoad = false;

  constructor(private starWarsService: StarWarsService, public loaderComponent: MatDialog, public route: Router) {
    this.loading()
    this.initalWebServices();
  }

  loading() {
    this.isLoadEmitter$.emit(false);
    this.isLoad = false;
    let dialogRef = this.loaderComponent.open(LoaderComponent, {
      disableClose: true
    });
  }

  stopLoad() {
    this.loaderComponent.closeAll();
    this.isLoadEmitter$.emit(true)
    this.isLoad = true;
  }

  filter = (type: string, value: string) => {
    this.route.navigate(['/main']);
    this.charactersList = this.originalList;
    switch (type) {
      case 'film': {
        this.charactersList = this.charactersList.filter(item => {
          let arr = item.films.filter(a => a == value);
          if (arr.length >= 1) {
            return item;
          }
        });
        break;
      }
      case 'homeworld': {
        this.charactersList = this.charactersList.filter(item => {
          if (item.homeworld == value) {
            return item
          }
        });
        break;
      }
      case 'starship': {
        this.charactersList = this.charactersList.filter(item => {
          let arr = item.starships.filter(a => a == value);
          if (arr.length >= 1) {
            return item;
          }
        });
        break;
      }
    }
  }

  search = (search: string, type: string, value: string) => {
    if(value != '') {
      this.filter(type, value);
    } else {
      this.charactersList = this.originalList;
    }
    this.charactersList = this.charactersList.filter(item => {
      if (item.name.toLowerCase().includes(search.toLowerCase())) {
        return item
      }
    });
  }

  initalWebServices() {
    this.starWarsService.getAllCharacters(1).subscribe(data => {
      let arrlenght = Math.floor(data.count / 10);
      this.charactersList = this.charactersList.concat(data.results);
      for (let i = 2; i <= arrlenght+1; ++i) {
        this.starWarsService.getAllCharacters(i).subscribe(data => {
          this.charactersList = this.charactersList.concat(data.results);
          if (i == arrlenght) {
            this.originalList = this.charactersList.sort((a: Character, b: Character) => a.name > b.name ? 1 : -1);
            this.charactersList = this.originalList;
          }
        }, err => {
        });
      }
    }, err => {
    });

    this.starWarsService.getHomeWorlds(1).subscribe(data => {
      let arrlenght = Math.floor(data.count / 10);
      this.homeworlds = this.homeworlds.concat(data.results);
      for (let i = 2; i <= arrlenght; ++i) {
        this.starWarsService.getHomeWorlds(i).subscribe(data => {
          this.homeworlds = this.homeworlds.concat(data.results);
          if (i == arrlenght) {
            this.homeworlds = this.homeworlds.sort((a: Homeworld, b: Homeworld) => a.name > b.name ? 1 : -1);
          }
        }, err => {
        });
      }
    }, err => {
    });

    this.starWarsService.getStarships(1).subscribe(data => {
      let arrlenght = Math.floor(data.count / 10);
      this.starships = this.starships.concat(data.results);
      for (let i = 2; i <= arrlenght+1; ++i) {
        this.starWarsService.getStarships(i).subscribe(data => {
          this.starships = this.starships.concat(data.results);
          if (i == arrlenght) {
            this.starships = this.starships.sort((a: Starship, b: Starship) => a.name > b.name ? 1 : -1);
          }
        }, err => {
        });
      }
    }, err => {
    });

    this.starWarsService.getSpecies(1).subscribe(data => {
      let arrlenght = Math.floor(data.count / 10);
      this.species = this.species.concat(data.results);
      for (let i = 2; i <= arrlenght+1; ++i) {
        this.starWarsService.getSpecies(i).subscribe(data => {
          this.species = this.species.concat(data.results);
          if (i == arrlenght) {
            this.species = this.species.sort((a: Specie, b: Specie) => a.name > b.name ? 1 : -1);
          }
        }, err => {
        });
      }
    }, err => {
    });

    this.starWarsService.getFilms().subscribe(data => {
      this.films = data.results
      this.stopLoad();
    })
  }
  

}
