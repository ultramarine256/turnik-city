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
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-map',
  template: `
    <div [id]="this.mapId" class="map__canvas">
      <button type="button" class="map__home-button" (click)="zoomHome()">
        <fa-icon class="home-button__icon" [icon]="['fas', 'location-crosshairs']" size="lg"></fa-icon>
      </button>
    </div>
  `,
  styles: [
    `
      .map__canvas {
        width: 100%;
        height: 100%;
      }

      .map__home-button {
        position: absolute;
        z-index: 1005;
        bottom: 20px;
        right: 20px;

        background: #fff;
        border: 0;
        border-radius: 8px;
        box-shadow: 0 1px 2px rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
        width: 29px;
        height: 29px;
        cursor: pointer;

        display: grid;
        place-content: center;

        .map__home-button-icon {
          color: gray;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundMapComponent implements AfterViewInit, OnDestroy {
  @Input() mapId: string = 'app-map';
  @Input() center: Observable<{ lat: number; lng: number }> = new Observable<{ lat: number; lng: number }>();
  @Input() markers: Observable<PlaygroundMarkerModel[]> = new Observable<PlaygroundMarkerModel[]>();
  @Input() addMarker: boolean = false;
  @Output() markerClick = new EventEmitter<{ id: number; slug: string }>();
  @Output() newMarkerAdded = new EventEmitter<{ lat: number; lng: number }>();

  private readonly accessToken = environment.mapbox.accessToken;
  private map: L.Map;
  private ngUnsubscribe = new Subject<void>();

  private currentMarker: PlaygroundMarker;

  ngAfterViewInit() {
    this.initMap();
    this.addMarker && this.draggableMarker();
    this.center.pipe(takeUntil(this.ngUnsubscribe)).subscribe(r => this.centerMap(r));
    this.markers.pipe(takeUntil(this.ngUnsubscribe)).subscribe(r => this.addMarkers(r));
  }

  ngOnDestroy(): void {}

  public zoomHome() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) =>
          this.center
            .subscribe(x => this.map.setView([position.coords.latitude, position.coords.longitude]))
            .unsubscribe(),
        () => this.center.subscribe(x => this.map.setView([x.lat, x.lng])).unsubscribe()
      );
    } else {
      alert(
        'It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.'
      );
    }
  }

  private initMap() {
    this.map = L.map(this.mapId, {
      preferCanvas: true,
      minZoom: 4,
      zoomControl: false,
    });
    this.map.setView([47.0042, 28.8574], 13); // center map to Kiev by default
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
        color: '#ff9800', // #787878
        radius: 5,
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

  private draggableMarker() {
    this.map.on('click', e => {
      // 0. remove previous
      this.currentMarker && this.map.removeLayer(this.currentMarker);

      // 1. add marker
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      // https://turnikcity.blob.core.windows.net/logo/marker-black.svg
      this.currentMarker = new PlaygroundMarker([lat, lng], {
        color: '#ff9800',
        radius: 5,
        opacity: 0.9,
        id: 0,
        slug: '0',
        type: 'playground',
      });
      this.currentMarker.addTo(this.map);
      this.newMarkerAdded.emit({ lat, lng });
    });
  }
}
