import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { DomainFacade, PlaygroundFacade, PlaygroundMarkerModel, PlaygroundPreviewDialog } from 'app/domain';
import { ExtendedDialogService } from 'app/common';

@Component({
  selector: 'app-map-page',
  template: `
    <app-map class="map-component" [center]="center$" [markers]="markers$" (markerClick)="markerClick($event)">
    </app-map>
  `,
  styleUrls: ['./playground-map.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundMapPage {
  readonly center$ = this.store.ipDetails$.pipe(map(r => ({ lat: r.lat, lng: r.lng })));
  readonly markers$ = this.store.markers$.pipe(
    map(items => items.map(r => new PlaygroundMarkerModel({ id: r.id, slug: r.slug, lat: r.lat, lng: r.lng })))
  );

  constructor(
    public facade: PlaygroundFacade,
    private store: DomainFacade,
    private dialogService: ExtendedDialogService
  ) {}

  markerClick(e: { id: number; slug: string }) {
    const entity = this.facade.get(e.id);
    this.dialogService.openDialog(PlaygroundPreviewDialog, 'preview-dialog', { entity });
  }
}
