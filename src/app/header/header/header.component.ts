import { Component } from '@angular/core';
import { MatTabsModule} from '@angular/material/tabs'
import { QuizSeiteComponent } from '../../quiz-seite/quiz-seite.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatTabsModule, QuizSeiteComponent, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  ranking: { name: string, score: number }[] = [];

  onQuizBeendet(event: { name: string, score: number }) {
    this.ranking.push(event);
    // Sortiere nach Score absteigend
    this.ranking.sort((a, b) => b.score - a.score);
  }
}
