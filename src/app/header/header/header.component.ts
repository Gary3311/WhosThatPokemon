import { Component } from '@angular/core';
import { MatTabsModule} from '@angular/material/tabs'
import { QuizSeiteComponent } from '../../quiz-seite/quiz-seite.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatTabsModule, QuizSeiteComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
