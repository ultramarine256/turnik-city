import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppStore, PlaygroundFacade, PlaygroundPreviewComponent } from '@turnik/domain';
import { map } from 'rxjs/operators';
import { PlaygroundMarkerModel } from '@turnik/domain';
import { ExtendedDialogService } from '@turnik/common';

@Component({
  selector: 'app-map-page',
  template: `
    <app-map class="map-component" [center]="center$" [markers]="markers$" (markerClick)="markerClick($event)">
    </app-map>
  `,
  styleUrls: ['./playground-map-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundMapPageComponent {
  readonly center$ = this.store.ipDetails$.pipe(map(r => ({ lat: r.lat, lng: r.lng })));
  readonly markers$ = this.store.markers$.pipe(
    map(items => items.map(r => new PlaygroundMarkerModel({ id: r.id, slug: r.slug, lat: r.lat, lng: r.lng })))
  );

  constructor(public facade: PlaygroundFacade, public store: AppStore, private dialogService: ExtendedDialogService) {}

  markerClick(e: { id: number; slug: string }) {
    const entity = this.facade.get(e.id);
    this.dialogService.openDialog(PlaygroundPreviewComponent, 'preview-dialog', { entity });
  }
}
