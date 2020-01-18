import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from './components/text/text.component';
import { CustomAComponent } from './components/custom-a/custom-a.component';
import { CustomBComponent } from './components/custom-b/custom-b.component';

@NgModule({
  declarations: [TextComponent, CustomAComponent, CustomBComponent],
  imports: [CommonModule],
  exports: [TextComponent, CustomAComponent, CustomBComponent]
})
export class SharedModule {}
