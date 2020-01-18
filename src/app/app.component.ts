import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  simpleText = `
    Paragraph #1
    Paragraph #2
    Paragraph #3
    Paragraph #4
  `;
}
