import { NgModule } from '@angular/core';
import { AppCommonModule } from 'app/common';
import { DomainModule } from 'app/domain';
import {
  AboutPageComponent,
  PagesComponent,
  PagesRouting,
  ProfilePageComponent,
  PlaygroundMapPage,
  UIPageComponent,
  HomePageComponent,
  PlaygroundDetailsPage,
  PlaygroundsListPage,
  UserListPage,
} from './index';

const COMPONENTS = [
  AboutPageComponent,
  ProfilePageComponent,
  HomePageComponent,
  PlaygroundDetailsPage,
  PlaygroundsListPage,
  PlaygroundMapPage,
  UIPageComponent,
  UserListPage,
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
