import { Component, OnInit, signal } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-quiz-seite',
  imports: [NgIf],
  templateUrl: './quiz-seite.component.html',
  styleUrl: './quiz-seite.component.css'
})
export class QuizSeiteComponent implements OnInit {

  title = 'Whos that Pokemon?';
  pokemonId = 0;
  pokemonNamen: string[] = ["", "", ""];
  aktivePokemon = signal<any>(null);

  constructor(public pokemonService: PokemonService) {}

  async ngOnInit(): Promise<void> {
    this.pokemonId = this.getRandomPokemonId();
    await this.pokemonService.getPokemon(this.pokemonId.toString());
    await this.getPokemonNamen();
  }

  getRandomPokemonId(): number {
    return Math.floor(Math.random() * 150) + 1;
  }

  async getPokemonNamen(): Promise<void> {
    try {
      // Pokémon-IDs für die drei Namen auswählen
      const ids = [this.pokemonId, this.getRandomPokemonId(), this.getRandomPokemonId()];

      // Pokémon-Namen asynchron abrufen
      const names = await Promise.all(ids.map(async (id) => {
        await this.pokemonService.getPokemonName(id.toString());
        return this.pokemonService.pokemonNameDe(); // Zugriff auf das Signal
      }));

      // Namen in Array speichern
      this.pokemonNamen = names;
    } catch (error) {
      console.error("Fehler beim Laden der Pokémon-Namen:", error);
    }
  }
}
