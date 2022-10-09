import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppCommonModule } from './index';

@NgModule({
  declarations: [],
  imports: [
    /// angular
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    /// app
    AppCommonModule,
  ],
  exports: [],
  providers: [],
})
export class DomainModule {}
