import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { NgIf } from '@angular/common';
import { QuizSeiteComponent } from './quiz-seite/quiz-seite.component';

@Component({
  selector: 'app-root',
  imports: [QuizSeiteComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  constructor(public pokemonService: PokemonService){}

  ngOnInit(): void{

  }

}
