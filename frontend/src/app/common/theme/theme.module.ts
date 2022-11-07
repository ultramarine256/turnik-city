import { NgModule } from '@angular/core';
import { AppFontAwesomeModule, SwiperLibModule, LibsModule } from './libs';
import { ExtendedDialogModule, ImageSelectorModule, SnackbarModule } from './custom';

const MODULES = [
  LibsModule,
  SnackbarModule,
  AppFontAwesomeModule,
  ExtendedDialogModule,
  ImageSelectorModule,
  SwiperLibModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class ThemeModule {}
