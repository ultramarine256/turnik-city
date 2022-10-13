import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as L from 'leaflet';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-map',
  template: ` <div id="map"></div> `,
  styles: [
    `
      #map {
        height: calc(100vh - 4.2rem);
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundMapComponent implements AfterViewInit {
  @Input() lat: number;
  @Input() lng: number;
  @Input() markers: { lat: number; lng: number }[];
  private map: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      preferCanvas: true,
      minZoom: 4,
    });

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'TurnikCity',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    }).addTo(this.map);

    this.map.setView([this.lat, this.lng], 13);
    this.markers.forEach(({ lat, lng }) => {
      const marker = new PlaygroundMarker([lat, lng], {
        color: '#3388ff',
        radius: 4,
        opacity: 0.9,
        type: 'playground',
        slug: 'aaa',
      }).on('click', (e: any) => {
        this.testMethod(e);
      });
      marker.addTo(this.map);
    });
  }

  public testMethod(e: any) {
    console.log(e.sourceTarget.options.type);
  }
}

export class PlaygroundMarker extends L.CircleMarker {
  data: any;

  constructor(latLng: L.LatLngExpression, options?: PlaygroundMarkerOptions) {
    super(latLng, options);
  }

  getData() {
    return this.data;
  }

  setData(data: any) {
    this.data = data;
  }
}

export interface PlaygroundMarkerOptions extends L.CircleMarkerOptions {
  type: 'playground';
  slug: string;
  level?: string;
}
