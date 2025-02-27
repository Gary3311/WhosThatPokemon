import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgIf],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  title = 'WhosThatPokemon';
  
  constructor(public pokemonService: PokemonService){}

  ngOnInit(): void{
    this.pokemonService.getPokemon('25');
  }

}
