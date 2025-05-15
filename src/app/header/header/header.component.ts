import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'
import { QuizSeiteComponent } from '../../quiz-seite/quiz-seite.component';
import { NgFor, NgIf } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatTabsModule, QuizSeiteComponent, NgFor, NgIf, MatButtonModule],
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
  selectedTabIndex = 0;

  onTabChanged(event: any) {
    this.selectedTabIndex = event.index;
  }

  exportRankingAsXML() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<ranking>\n';
    this.ranking.forEach((eintrag: any, i: number) => {
      xml += `  <platzierung>\n`;
      xml += `    <platz>${i + 1}</platz>\n`;
      xml += `    <name>${eintrag.name}</name>\n`;
      xml += `    <punkte>${eintrag.score}</punkte>\n`;
      xml += `  </platzierung>\n`;
    });
    xml += '</ranking>';

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'ranking.xml';
    a.click();
    URL.revokeObjectURL(url);
  }
}
