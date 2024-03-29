import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule, ThemeModule } from 'app/common';

const MODULES = [
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
  // ----
  DirectivesModule,
  ThemeModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class AppCommonModule {}
