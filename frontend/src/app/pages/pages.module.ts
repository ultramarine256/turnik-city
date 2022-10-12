import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { ThemeModule } from '@turnik/common';
import { PlaygroundMapComponent, DomainModule } from '@turnik/domain';
import {
  PagesComponent,
  PagesRouting,
  FavoritesPageComponent,
  PlaygroundPageComponent,
  UIPageComponent,
  HomePageComponent,
} from './index';
import { environment } from '../../environments/environment';

const COMPONENTS = [
  PagesComponent,
  PlaygroundPageComponent,
  PlaygroundMapComponent,
  FavoritesPageComponent,
  HomePageComponent,
  UIPageComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    /// angular
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    /// app
    NgxGoogleAnalyticsModule.forRoot(environment.googleTrackingCode),
    ThemeModule,
    DomainModule,

    /// routing
    PagesRouting,
  ],
  exports: [],
  providers: [],
})
export class PagesModule {}
