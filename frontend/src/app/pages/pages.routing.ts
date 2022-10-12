import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesModule } from './pages.module';
import {
  HomePageComponent,
  UIPageComponent,
  FavoritesPageComponent,
  PlaygroundPageComponent,
  PagesComponent,
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
        path: 'playground',
        component: PlaygroundPageComponent,
        resolve: { pagesResolver: PagesResolver },
      },
      {
        path: 'liked',
        component: FavoritesPageComponent,
        resolve: { pagesResolver: PagesResolver },
      },
      {
        path: 'ui',
        component: UIPageComponent,
        resolve: { pagesResolver: PagesResolver },
      },
    ],
  },
];

export const PagesRouting: ModuleWithProviders<PagesModule> = RouterModule.forChild(routes);
