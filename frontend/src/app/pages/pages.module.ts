import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { PlaygroundMapComponent, DomainModule } from '@turnik/domain';
import {
  PagesComponent,
  PagesRouting,
  FavoritesPageComponent,
  PlaygroundMapPageComponent,
  UIPageComponent,
  HomePageComponent,
  PlaygroundDetailsPageComponent,
} from './index';
import { environment } from '../../environments/environment';
import { AboutPageComponent } from './about/about-page.component';

const COMPONENTS = [
  AboutPageComponent,
  FavoritesPageComponent,
  HomePageComponent,
  PlaygroundMapPageComponent,
  PlaygroundMapComponent,
  PlaygroundDetailsPageComponent,
  UIPageComponent,
  PagesComponent,
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
    DomainModule,
    NgxGoogleAnalyticsModule.forRoot(environment.googleTrackingCode),

    /// routing
    PagesRouting,
  ],
  exports: [],
  providers: [],
})
export class PagesModule {}
