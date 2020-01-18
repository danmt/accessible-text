import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextComponent } from './shared/components/text/text.component';

@NgModule({
  declarations: [AppComponent, TextComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [TextComponent]
})
export class AppModule {}
