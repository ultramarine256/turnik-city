import { NgModule } from '@angular/core';
import { AppFontAwesomeModule, LibsModule } from './libs';
import { ExtendedDialogModule, SnackbarModule } from './custom';

const MODULES = [LibsModule, SnackbarModule, AppFontAwesomeModule, ExtendedDialogModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class ThemeModule {}
