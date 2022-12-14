import { NgModule } from '@angular/core';
import { PlaygroundFacade } from './playground.facade';
import { PlaygroundCreateComponent, PlaygroundMapComponent, PlaygroundPreviewComponent } from './index';
import { AppCommonModule } from 'app/common';

@NgModule({
  declarations: [PlaygroundCreateComponent, PlaygroundPreviewComponent, PlaygroundMapComponent],
  imports: [AppCommonModule],
  exports: [PlaygroundMapComponent],
  providers: [PlaygroundFacade],
})
export class PlaygroundModule {}
