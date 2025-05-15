import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { NgIf } from '@angular/common';
import { HeaderComponent } from './header/header/header.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'WhosThatPokemon';
  constructor(public pokemonService: PokemonService){}

  ngOnInit(): void{

  }

}
