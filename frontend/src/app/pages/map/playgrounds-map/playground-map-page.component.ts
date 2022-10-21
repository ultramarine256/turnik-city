import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PlaygroundCreateComponent, PlaygroundFacade, PlaygroundPreviewComponent } from '@turnik/domain';
import { map } from 'rxjs/operators';
import { PlaygroundMarkerModel } from '@turnik/domain';
import { environment } from '../../../../environments/environment';
import { ExtendedDialogService } from '@turnik/common';

@Component({
  selector: 'app-map-page',
  templateUrl: './playground-map-page.component.html',
  styleUrls: ['./playground-map-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundMapPageComponent implements OnInit {
  readonly token = environment.mapbox.accessToken;
  readonly center$ = this.facade.ipDetails$.pipe(map(r => ({ lat: r.lat, lng: r.lng })));
  readonly markers$ = this.facade.markers$.pipe(
    map(items =>
      items.map(r => {
        return new PlaygroundMarkerModel({ id: r.id, slug: r.slug, lat: r.lat, lng: r.lng });
      })
    )
  );

  constructor(public facade: PlaygroundFacade, private dialogService: ExtendedDialogService) {}

  ngOnInit() {}

  markerClick(e: { id: number; slug: string }) {
    const entity = this.facade.get(e.id);
    this.dialogService.openDialog(PlaygroundPreviewComponent, { entity });
  }
}
