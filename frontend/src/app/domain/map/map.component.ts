import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import {
  circle,
  latLng,
  LatLngTuple,
  Layer,
  marker,
  polygon,
  tileLayer,
} from 'leaflet';
import { Playground } from '../playground/playgorund';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnChanges {
  @Input() playgrounds: readonly Playground[] | undefined = [];

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 5,
    center: latLng(50.4501, 30.5234),
  };
  layers: Layer[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const markers = (this.playgrounds || []).map((r) =>
      marker([r.latitude, r.longitude] as LatLngTuple)
    );
    this.layers = [
      circle([46.95, -122], { radius: 5000 }),
      polygon([
        [46.8, -121.85],
        [46.92, -121.92],
        [46.87, -121.8],
      ]),
      ...markers,
    ];
  }
}
