import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from './components/text/text.component';

@NgModule({
  declarations: [TextComponent],
  imports: [CommonModule],
  exports: [TextComponent]
})
export class SharedModule {}
