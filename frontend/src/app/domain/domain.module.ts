import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppCommonModule, PlaygroundModule } from './index';
import { SeoService } from './infrastructure/services';

@NgModule({
  declarations: [],
  imports: [
    /// angular
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    /// app
    AppCommonModule,
    PlaygroundModule,
  ],
  exports: [],
  providers: [SeoService],
})
export class DomainModule {}
