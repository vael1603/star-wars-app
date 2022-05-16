import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  constructor(private http: HttpClient) { }
 
  api = environment.starWarsApi;

  getAllCharacters(page: number) {
    return this.http.get<any>(`${this.api}/people/?page=${page}`);
  }

  getCharacterByID( id:number ) {
    return this.http.get<any>(`${this.api}/people/${id}`);
  }

  getHomeWorlds(page:number) {
    return this.http.get<any>(`${this.api}/planets/?page=${page}`)
  }

  getFilms() {
    return this.http.get<any>(`${this.api}/films`)
  }

  getStarships(page: number) {
    return this.http.get<any>(`${this.api}/starships/?page=${page}`)
  }

  getSpecies(page: number) {
    return this.http.get<any>(`${this.api}/species/?page=${page}`)
  }

  executeWebServices( url:string ) {
    return this.http.get<any>(url);
  }
}
