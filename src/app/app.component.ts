import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  height:number=0;
  showFiller = false;
  title = 'libraryManagementSystem';
  constructor()
  {
    this.height= window.screen.height-172;
  }
}
