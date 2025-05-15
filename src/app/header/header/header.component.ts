import { Component } from '@angular/core';
import { MatTabsModule} from '@angular/material/tabs'

@Component({
  selector: 'app-header',
  imports: [MatTabsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
