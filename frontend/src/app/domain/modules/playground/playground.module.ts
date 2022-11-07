import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RepositoryModule } from '@turnik/data';
import { PlaygroundFacade } from './playground.facade';
import { PlaygroundCreateComponent, PlaygroundMapComponent, PlaygroundPreviewComponent } from './index';
import { ThemeModule } from '@turnik/common';

@NgModule({
  declarations: [PlaygroundCreateComponent, PlaygroundPreviewComponent, PlaygroundMapComponent],
  imports: [
    /// angular
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    /// app
    RepositoryModule,
    ThemeModule,
  ],
  exports: [PlaygroundMapComponent],
  providers: [PlaygroundFacade],
})
export class PlaygroundModule {}
