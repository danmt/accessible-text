import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-custom-b',
  templateUrl: './custom-b.component.html',
  styleUrls: ['./custom-b.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomBComponent {
  @Input() paragraph: string;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;
}
