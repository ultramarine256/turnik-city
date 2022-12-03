import { NgModule } from '@angular/core';
import { RepositoryModule } from '@turnik/data';
import { PlaygroundFacade } from './playground.facade';
import { PlaygroundCreateComponent, PlaygroundMapComponent, PlaygroundPreviewComponent } from './index';
import { ThemeModule } from '@turnik/common';

@NgModule({
  declarations: [PlaygroundCreateComponent, PlaygroundPreviewComponent, PlaygroundMapComponent],
  imports: [RepositoryModule, ThemeModule],
  exports: [PlaygroundMapComponent],
  providers: [PlaygroundFacade],
})
export class PlaygroundModule {}
