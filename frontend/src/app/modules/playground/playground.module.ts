import { NgModule } from '@angular/core';
import { PlaygroundFacade } from './playground.facade';
import { PlaygroundCreateDialog, PlaygroundMapComponent, PlaygroundPreviewDialog } from './index';
import { AppCommonModule } from 'app/common';

@NgModule({
  declarations: [PlaygroundCreateDialog, PlaygroundPreviewDialog, PlaygroundMapComponent],
  imports: [AppCommonModule],
  exports: [PlaygroundMapComponent],
  providers: [PlaygroundFacade],
})
export class PlaygroundModule {}
