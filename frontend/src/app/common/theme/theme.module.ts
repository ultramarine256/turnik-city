import { NgModule } from '@angular/core';
import { AppFontAwesomeModule, LibsModule } from './libs';
import { SnackbarModule } from './custom';

const MODULES = [LibsModule, SnackbarModule, AppFontAwesomeModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class ThemeModule {}
