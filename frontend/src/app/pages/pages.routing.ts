import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesModule } from './pages.module';
import {
  HomePageComponent,
  UIPageComponent,
  ProfilePageComponent,
  PagesComponent,
  PlaygroundDetailsPage,
  AboutPageComponent,
  PlaygroundsListPage,
  PlaygroundMapPage,
  UserListPage,
} from './index';
import { PagesResolver } from './pages.resolver';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
        resolve: { pagesResolver: PagesResolver },
      },
      {
        path: 'map',
        component: PlaygroundMapPage,
        resolve: { pagesResolver: PagesResolver },
      },
      {
        path: 'playgrounds',
        children: [
          {
            path: '',
            component: PlaygroundsListPage,
            pathMatch: 'full',
          },
          {
            path: ':slug',
            component: PlaygroundDetailsPage,
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UserListPage,
          },
        ],
      },
      {
        path: 'about',
        component: AboutPageComponent,
      },
      {
        path: 'codex',
        component: AboutPageComponent,
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
        resolve: { pagesResolver: PagesResolver },
      },
      {
        path: 'ui',
        component: UIPageComponent,
        resolve: { pagesResolver: PagesResolver },
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

export const PagesRouting: ModuleWithProviders<PagesModule> = RouterModule.forChild(routes);
