import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  constructor(public pokemonService: PokemonService){}

  ngOnInit(): void{

  }

}
