import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesModule } from './pages.module';
import {
  HomePageComponent,
  UIPageComponent,
  ProfilePageComponent,
  PlaygroundMapPageComponent,
  PagesComponent,
  PlaygroundDetailsPageComponent,
  AboutPageComponent,
  NotFoundPageComponent,
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
        component: PlaygroundMapPageComponent,
        resolve: { pagesResolver: PagesResolver },
      },
      {
        path: 'playground/:slug',
        component: PlaygroundDetailsPageComponent,
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
        path: 'liked',
        component: ProfilePageComponent,
        resolve: { pagesResolver: PagesResolver },
      },
      {
        path: 'ui',
        component: UIPageComponent,
        resolve: { pagesResolver: PagesResolver },
      },
      {
        path: '404',
        component: NotFoundPageComponent,
        resolve: { pagesResolver: PagesResolver },
      },
      {
        path: '**',
        redirectTo: '404',
      },
    ],
  },
];

export const PagesRouting: ModuleWithProviders<PagesModule> = RouterModule.forChild(routes);
