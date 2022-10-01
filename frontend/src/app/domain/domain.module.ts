import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';

const COMPONENTS = [MapComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    /// angular
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    /// app
  ],
  exports: [],
  providers: [],
})
export class DomainModule {}
