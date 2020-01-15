import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent {
  private text$ = new BehaviorSubject('');

  lines$ = this.text$.asObservable().pipe(
    map((content: string) =>
      content
        .split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => line)
    )
  );

  @Input() set innerContent(text: string) {
    this.text$.next(text);
  }
}
