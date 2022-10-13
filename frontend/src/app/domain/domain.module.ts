import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DirectivesModule, ThemeModule } from '@turnik/common';
import { AppCommonModule, AppStore, InterceptorsModule, PlaygroundModule } from './index';
import { SeoService } from './infrastructure';

@NgModule({
  declarations: [],
  imports: [
    /// angular
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    /// app
    InterceptorsModule,
    ThemeModule,
    DirectivesModule,
    AppCommonModule,
    PlaygroundModule,
  ],
  exports: [InterceptorsModule, ThemeModule, DirectivesModule, AppCommonModule, PlaygroundModule],
  providers: [SeoService, AppStore],
})
export class DomainModule {}
