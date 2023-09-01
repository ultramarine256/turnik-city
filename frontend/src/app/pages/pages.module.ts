import { NgModule } from '@angular/core';
import { AppCommonModule } from 'app/common';
import { DomainModule } from 'app/modules';
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
  imports: [AppCommonModule, DomainModule, PagesRouting],
})
export class PagesModule {}
