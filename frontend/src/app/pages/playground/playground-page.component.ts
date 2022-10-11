import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlaygroundFacade } from '@turnik/domain';

@Component({
  selector: 'app-map-page',
  template: `
    <ng-template #loading><div class="loading">Loading...</div></ng-template>
    <ng-container *ngIf="facade.vm$ | async as vm; else loading">
      <app-map [markers]="vm.markers" [lat]="vm.ipDetails.lat" [lng]="vm.ipDetails.lng"></app-map>
    </ng-container>
  `,
  styles: [
    `
      .loading {
        padding: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundPageComponent {
  constructor(public facade: PlaygroundFacade) {}
}