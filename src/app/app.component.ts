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
  textWithNewLines = `
    Paragraph #1\n
    Paragraph #2\n
    Paragraph #3\n
    Paragraph #4\n
  `;
}
