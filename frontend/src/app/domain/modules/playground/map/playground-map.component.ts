import {
  AfterViewInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Component,
  Input,
  Output,
  OnDestroy,
} from '@angular/core';
import * as L from 'leaflet';
import { PlaygroundMarker, PlaygroundMarkerModel } from './model';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './playground-map.component.html',
  styleUrls: ['./playground-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundMapComponent implements AfterViewInit, OnDestroy {
  @Input() accessToken: string;
  @Input() center: Observable<{ lat: number; lng: number }>;
  @Input() markers: Observable<PlaygroundMarkerModel[]>;
  @Output() markerClick = new EventEmitter<{ id: number; slug: string }>();

  private map: L.Map;
  private ngUnsubscribe = new Subject<void>();

  ngAfterViewInit() {
    this.initMap();
    this.center.pipe(takeUntil(this.ngUnsubscribe)).subscribe(r => this.centerMap(r));
    this.markers.pipe(takeUntil(this.ngUnsubscribe)).subscribe(r => this.addMarkers(r));
  }

  private initMap() {
    this.map = L.map('map', {
      preferCanvas: true,
      minZoom: 4,
    });
    // center map to Kiev by default
    this.map.setView([47.0042, 28.8574], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'TurnikCity',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: this.accessToken,
    }).addTo(this.map);
  }

  private centerMap(x: { lat: number; lng: number }) {
    this.map.setView([x.lat, x.lng], 13);
  }

  private addMarkers(markers: PlaygroundMarkerModel[]) {
    markers.forEach(x => {
      const marker = new PlaygroundMarker([x.lat, x.lng], {
        color: '#ff9800',
        radius: 4.2,
        opacity: 0.9,
        id: x.id,
        slug: x.slug,
        type: 'playground',
      }).on('click', e => {
        const o = e.target.options;
        this.markerClick.emit({ id: o.id, slug: o.slug });
      });
      marker.addTo(this.map);
    });
  }

  ngOnDestroy(): void {
    console.log('desctroy');
  }
}
