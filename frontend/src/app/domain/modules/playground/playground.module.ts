import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RepositoryModule } from '@turnik/data';
import { PlaygroundFacade } from './playground.facade';

@NgModule({
  declarations: [],
  imports: [
    /// angular
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    /// app
    RepositoryModule,
  ],
  exports: [],
  providers: [PlaygroundFacade],
})
export class PlaygroundModule {}
