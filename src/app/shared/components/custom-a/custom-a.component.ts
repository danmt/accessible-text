import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-custom-a',
  templateUrl: './custom-a.component.html',
  styleUrls: ['./custom-a.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomAComponent {
  @Input() paragraph: string;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;
}
