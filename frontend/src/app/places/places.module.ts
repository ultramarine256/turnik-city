import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PlacesComponent } from './places.component';

@NgModule({
  declarations: [PlacesComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [PlacesComponent],
})
export class PlacesModule {}
