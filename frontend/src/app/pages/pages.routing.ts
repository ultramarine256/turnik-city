import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PagesModule } from './pages.module';
import { MapPageComponent } from './map/map-page.component';
import { FavoritesPageComponent } from './favorites/favorites-page.component';
import { UIPageComponent } from './ui/ui-page.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: MapPageComponent,
      },
      {
        path: 'liked',
        component: FavoritesPageComponent,
      },
      {
        path: 'ui',
        component: UIPageComponent,
      },
    ],
  },
];

export const PagesRouting: ModuleWithProviders<PagesModule> = RouterModule.forChild(routes);
