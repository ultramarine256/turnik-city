import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomainModule } from '@turnik/domain';
import {
  PagesComponent,
  PagesRouting,
  ProfilePageComponent,
  PlaygroundMapPageComponent,
  UIPageComponent,
  HomePageComponent,
  PlaygroundDetailsPageComponent,
  NotFoundPageComponent,
} from './index';
import { AboutPageComponent } from './about/about-page.component';

const COMPONENTS = [
  AboutPageComponent,
  ProfilePageComponent,
  HomePageComponent,
  PlaygroundMapPageComponent,
  PlaygroundDetailsPageComponent,
  UIPageComponent,
  NotFoundPageComponent,
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

    /// routing
    PagesRouting,
  ],
  exports: [],
  providers: [],
})
export class PagesModule {}
