import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/';
  private urlPokemon = 'pokemon/';
  private urlSpecies = 'pokemon-species/';

  pokemon = signal<any>(null); // Signal für reaktive Datenhaltung
  pokemonNameDe = signal<string>(''); //

  //Holt das Pokemon und triggert auch das holen des deutschen Namens
  async getPokemon(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}${this.urlPokemon}${id}`);
      if (!response.ok) throw new Error('Fehler beim Laden des Pokemon');
      const data = await response.json();
      this.pokemon.set(data);

      // Nach dem Laden des Pokémon die deutsche Bezeichnung abrufen
      await this.getPokemonName(id);
    } catch (error) {
      console.error(error);
    }
  }

  async getPokemonName(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}${this.urlSpecies}${id}`);
      if (!response.ok) throw new Error('Fehler beim Laden der Pokemonbezeichnung');
      const data = await response.json();

      // Finde den deutschen Namen
      const germanName = data.names.find((name: any) => name.language.name === 'de')?.name || 'Unbekannt';
      this.pokemonNameDe.set(germanName);
    } catch (error) {
      console.error(error);
    }
  }
}
