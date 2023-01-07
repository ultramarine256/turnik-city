import { NgModule } from '@angular/core';
import { AppCommonModule } from 'app/common';
import { DomainModule } from 'app/domain';
import {
  AboutPageComponent,
  PagesComponent,
  PagesRouting,
  ProfilePageComponent,
  PlaygroundMapPageComponent,
  UIPageComponent,
  HomePageComponent,
  PlaygroundDetailsPage,
  PlaygroundsListPage,
} from './index';

const COMPONENTS = [
  AboutPageComponent,
  ProfilePageComponent,
  HomePageComponent,
  PlaygroundMapPageComponent,
  PlaygroundDetailsPage,
  PlaygroundsListPage,
  UIPageComponent,
  PagesComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    AppCommonModule,
    DomainModule,

    /// routing
    PagesRouting,
  ],
  exports: [],
  providers: [],
})
export class PagesModule {}
