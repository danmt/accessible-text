import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent {
  @ContentChild('paragraphTemplate', { static: true })
  paragraphTemplateRef: TemplateRef<any>;
  private text$ = new BehaviorSubject('');

  paragraphs$ = this.text$.asObservable().pipe(
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
