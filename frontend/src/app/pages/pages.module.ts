import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ThemeModule,
    DomainModule,

    /// routing
    PagesRouting,
  ],
  exports: [],
  providers: [],
})
export class PagesModule {}
