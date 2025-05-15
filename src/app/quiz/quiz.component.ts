import { Component, OnInit, computed } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  pokemon = computed(() => this.pokemonService.pokemon());
  pokemonNameDe = computed(() => this.pokemonService.pokemonNameDe());

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    // Beispiel: Pokémon mit ID 25 (Pikachu) laden
    this.pokemonService.getPokemon('25');
  }
}
