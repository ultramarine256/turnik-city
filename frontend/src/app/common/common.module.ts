import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule, ThemeModule } from 'app/common';

const MODULES = [
  // angular
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,

  // app
  ThemeModule,
  DirectivesModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class AppCommonModule {}
