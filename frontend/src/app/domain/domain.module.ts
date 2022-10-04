import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    /// angular
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    /// app
    SharedModule,
  ],
  exports: [],
  providers: [],
})
export class DomainModule {}
