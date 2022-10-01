import { NgModule } from '@angular/core';
import { MaterialThemeModule } from './material/material-theme.module';

const MODULES = [MaterialThemeModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class LibsModule {}
