import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Homeworld } from '../../models/Homeworld';
import { Router } from '@angular/router';
import { Film } from '../../models/Film';
import { Starship } from '../../models/Starship';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  filter: (type: string, value: string) => void;
  search: (search: any, type: string, value: string) => void;
  setLala: () => void;
  homeworlds: Homeworld[];
  films: Film[];
  starships: Starship[]

  searchValue: string;
  filterValue: string
  filterType = 'all';

  constructor( public route: Router ) { }

  ngOnInit(): void {
    this.filterType == 'all';
  }

  cleanFilter() {
    this.route.navigate(['/main']);
    this.filterValue = '';
    this.filter( 'all', '');
  }

  disabled() {
    if(this.filterType == 'all' ) {
      return true
    } else {
      return false
    }
  }
}
