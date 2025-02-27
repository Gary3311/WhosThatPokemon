import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/';
  private urlPokemon ='pokemon/';
  private urlLanguage ='';
  pokemon = signal<any>(null); //Signal für reaktive Datenhaltung
  async getPokemon(id: string): Promise<void>{
    try{
        const response = await fetch(`${this.apiUrl}${this.urlPokemon}${id}`);
        if(!response.ok) throw new Error('Fehler beim Laden des Pokemon');
        const data = await response.json();
        this.pokemon.set(data);
    }
    catch(error){
      console.error(error);
    }
  }
}
