import { NgModule } from '@angular/core';
import { LibsModule } from './libs';
import { SnackbarModule } from './custom';

const MODULES = [LibsModule, SnackbarModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class ThemeModule {}
