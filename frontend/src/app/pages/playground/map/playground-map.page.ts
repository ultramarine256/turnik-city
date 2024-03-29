import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { PagesFacade, PlaygroundFacade, PlaygroundMarkerModel, PlaygroundPreviewDialog } from 'app/modules';
import { ExtendedDialogService, toAsyncState } from 'app/common';

@Component({
  selector: 'app-map-page',
  template: `
    <app-map class="map-component" [center]="center$" [markers]="markers$" (markerClick)="markerClick($event)"> </app-map>
  `,
  styleUrls: ['./playground-map.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundMapPage {
  readonly center$ = this.pagesFacade.ipDetails$.pipe(map(r => ({ lat: r.lat, lng: r.lng })));
  readonly markers$ = this.pagesFacade.markers$.pipe(
    map(r => r.map(r => new PlaygroundMarkerModel({ id: r.id, slug: r.slug, lat: r.lat, lng: r.lng }))),
  );

  constructor(
    public readonly facade: PlaygroundFacade,
    public readonly pagesFacade: PagesFacade,
    private readonly dialogService: ExtendedDialogService,
  ) {}

  markerClick(e: { id: number; slug: string }) {
    const entity$ = this.facade.get(e.id).pipe(toAsyncState());
    this.dialogService.openDialog(PlaygroundPreviewDialog, 'preview-dialog', { entity$ });
  }
}
