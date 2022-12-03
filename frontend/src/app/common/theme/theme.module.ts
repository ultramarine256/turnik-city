import { NgModule } from '@angular/core';
import { AppFontAwesomeModule, SwiperLibModule, LibsModule } from './libs';
import { ExtendedDialogModule, ImageSelectorModule, SnackbarModule } from './custom';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MODULES = [
  LibsModule,
  SnackbarModule,
  AppFontAwesomeModule,
  ExtendedDialogModule,
  ImageSelectorModule,
  SwiperLibModule,
];

const NG_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

@NgModule({
  imports: [...MODULES, ...NG_MODULES],
  exports: [...MODULES, ...NG_MODULES],
})
export class ThemeModule {}
