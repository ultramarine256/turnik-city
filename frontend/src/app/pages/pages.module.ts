import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '@turnik/common';
import { RepositoryModule } from '@turnik/data';
import { PagesComponent } from './pages.component';
import { MapPageComponent } from './map/map-page.component';
import { FavoritesPageComponent } from './favorites/favorites-page.component';
import { UIPageComponent } from './ui/ui-page.component';
import { PagesRouting } from './pages.routing';

const MODULES = [ThemeModule, RepositoryModule];
const COMPONENTS = [PagesComponent, MapPageComponent, FavoritesPageComponent, UIPageComponent];

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
