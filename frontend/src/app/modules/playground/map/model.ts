import * as L from 'leaflet';

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
  id: number;
  slug: string;
  type: string;
}

export class PlaygroundMarkerModel {
  id: number;
  slug: string;
  type: string;
  lat: number;
  lng: number;

  constructor(init?: Partial<PlaygroundMarkerModel>) {
    Object.assign(this as any, init);
  }
}
