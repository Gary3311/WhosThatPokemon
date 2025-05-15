import { Component, OnInit, signal } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-quiz-seite',
  imports: [NgIf, NgFor],
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
  istAntwortRichtig = false;
  richtigeAntwort = '';


  constructor(public pokemonService: PokemonService) { }

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

  async ladeNeueFrage(): Promise<void> {
    this.pokemonId = this.getRandomPokemonId();
    await this.pokemonService.getPokemon(this.pokemonId.toString());

    // Rufe die Namen ab und setze die richtige Antwort danach
    await this.getPokemonNamen();

    // Direkt nach dem Abrufen der Namen setzen wir die richtige Antwort
    this.richtigeAntwort = this.pokemonService.pokemonNameDe();

    this.antwortGegeben = false;
  }

  antwortAuswaehlen(option: { name: string, istRichtig: boolean }): void {
    this.antwortGegeben = true;
    this.istAntwortRichtig = option.istRichtig;
  }

  naechsteFrage(): void {
    this.antwortGegeben = false;
    this.ladeNeueFrage();
  }
  shuffleArray(array: { name: string, istRichtig: boolean }[]): { name: string, istRichtig: boolean }[] {
    return array
      .map(value => ({ value, sort: Math.random() })) // Zufallswert hinzufügen
      .sort((a, b) => a.sort - b.sort)  // Zufallswerte sortieren
      .map(({ value }) => value); // Nur den Wert zurückgeben (das gemischte Array)
  }
}
