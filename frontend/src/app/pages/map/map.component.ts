import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as L from 'leaflet';
import { environment } from '../../../environments/environment';

export type Position = {
  lat: number;
  long: number;
};

@Component({
  selector: 'app-map',
  template: ` <div id="map"></div> `,
  styles: [
    `
      #map {
        height: calc(100vh - 4rem);
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  @Input() userPosition: Position;
  @Input() markers: { lat: number; lng: number }[];
  private map: L.Map;
  private markerIcon = L.icon({
    iconUrl: 'assets/img/marker-icon.png',
    shadowUrl: 'assets/img/marker-shadow.png',
    popupAnchor: [13, 0],
  });

  ngAfterViewInit(): void {
    this.initMap();
    this.markers.forEach(({ lat, lng }) => {
      const marker = L.marker([lat, lng], { icon: this.markerIcon });
      marker.addTo(this.map);
    });
  }

  private initMap(): void {
    this.map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    }).addTo(this.map);
    this.map.setView([this.userPosition.lat, this.userPosition.long], 13);
  }
}
