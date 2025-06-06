import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { NgFor, NgIf } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-quiz-seite',
  imports: [NgIf, NgFor, MatButtonModule],
  templateUrl: './quiz-seite.component.html',
  styleUrl: './quiz-seite.component.css'
})
export class QuizSeiteComponent implements OnInit {

  title = 'Whos that Pokemon?';
  pokemonId = 0;
  pokemonNamen: string[] = ["", "", ""];
  aktivePokemon = signal<any>(null);
  antwortMoeglichkeiten: { name: string, istRichtig: boolean }[] = [];
  antwortGegeben = false;
  istAntwortRichtig = true;
  richtigeAntwort = '';
  punktestand = 0;
  name = '';
  @Output() quizBeendet = new EventEmitter<{ name: string, score: number }>();


  constructor(public pokemonService: PokemonService) { }

  //Generiert eine zufällige Pokémon-ID zwischen 1 und 150
  // Die Pokemon bezeihen sich daher nur auf die erste Generation.
  //Falls mehr Pokemon in den Topf sollen, muss die Zahl 150 erhöht werden.
  getRandomPokemonId(): number {
    return Math.floor(Math.random() * 150) + 1;
  }

  // Diese Methode wird aufgerufen, um die drei Pokémon-Namen abzurufen, welche angezeigt werden.
  async getPokemonNamen(): Promise<void> {
    try {
      // Pokémon-IDs für die drei Namen auswählen
      const ids = [this.pokemonId, this.getRandomPokemonId(), this.getRandomPokemonId()];

      // Pokémon-Namen asynchron abrufen
      const names = await Promise.all(ids.map(async (id) => {
        await this.pokemonService.getPokemonName(id.toString());
        return this.pokemonService.pokemonNameDe(); // Zugriff auf das Signal
      }));

      await this.pokemonService.getPokemonName(this.pokemonId.toString());
      this.richtigeAntwort = this.pokemonService.pokemonNameDe();

      // Antwortmöglichkeiten erstellen, die die richtige Antwort markieren
      const moeglichkeiten = names.map(name => ({
        name,
        istRichtig: name === this.pokemonService.pokemonNameDe() // Direkt nach dem Abrufen prüfen
      }));

      // Mische die Antwortmöglichkeiten
      this.antwortMoeglichkeiten = this.shuffleArray(moeglichkeiten);

    } catch (error) {
      console.error("Fehler beim Laden der Pokémon-Namen:", error);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.ladeNeueFrage();
  }

  //Lädt eine neue Frage, indem ein neues Pokémon ausgewählt wird und die Namen abgerufen werden.
  async ladeNeueFrage(): Promise<void> {
    this.pokemonId = this.getRandomPokemonId();
    await this.pokemonService.getPokemon(this.pokemonId.toString());

    // Rufe die Namen ab und setze die richtige Antwort danach
    await this.getPokemonNamen();

    // Direkt nach dem Abrufen der Namen setzen wir die richtige Antwort
    this.richtigeAntwort = this.pokemonService.pokemonNameDe();

    this.antwortGegeben = false;
  }

  // Diese Methode wird aufgerufen, wenn der Spieler eine Antwort auswählt.
  // Sie überprüft, ob die Antwort richtig ist und aktualisiert den Punktestand.
  antwortAuswaehlen(option: { name: string, istRichtig: boolean }): void {
    this.antwortGegeben = true;
    this.istAntwortRichtig = option.istRichtig;
    if(option.istRichtig) {
      this.punktestand++;
    } else {
      // Quiz beenden und Name abfragen
      this.name = prompt('Bitte gib deinen Namen für die Rangliste ein:') || 'Anonym';
      this.quizBeendet.emit({ name: this.name, score: this.punktestand });
      this.punktestand = 0; // Reset für nächsten Durchgang
    }
  }

  // Diese Methode wird aufgerufen, um die nächste Frage zu laden.
  naechsteFrage(): void {
    this.antwortGegeben = false;
    this.ladeNeueFrage();
  }
  // Shuffelt ein Array von Objekten, um die Antwortmöglichkeiten zufällig anzuzeigen.
  shuffleArray(array: { name: string, istRichtig: boolean }[]): { name: string, istRichtig: boolean }[] {
    return array
      .map(value => ({ value, sort: Math.random() })) // Zufallswert hinzufügen
      .sort((a, b) => a.sort - b.sort)  // Zufallswerte sortieren
      .map(({ value }) => value); // Nur den Wert zurückgeben (das gemischte Array)
  }
}
