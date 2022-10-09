import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../common';
import { RepositoryModule } from '../data';
import { FavoritesPageComponent } from './favorites/favorites-page.component';
import { MapPageComponent } from './map/map-page.component';
import { MapComponent } from './map/map.component';
import { PagesComponent } from './pages.component';
import { PagesRouting } from './pages.routing';
import { UIPageComponent } from './ui/ui-page.component';

const MODULES = [ThemeModule, RepositoryModule];
const COMPONENTS = [PagesComponent, MapPageComponent, MapComponent, FavoritesPageComponent, UIPageComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    /// angular
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    /// app
    ...MODULES,

    /// routing
    PagesRouting,
  ],
  exports: [],
  providers: [],
})
export class PagesModule {}
