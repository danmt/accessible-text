import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  private text$ = new BehaviorSubject('');

  // Observable that emits a text content splitted
  // by paragraph.
  paragraphs$ = this.text$.asObservable().pipe(
    map((content: string) =>
      content
        .split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => line)
    )
  );

  // Input that receives the content and emits it to the
  // Subject every time it changes.
  @Input() set innerContent(text: string) {
    this.text$.next(text);
  }
}
