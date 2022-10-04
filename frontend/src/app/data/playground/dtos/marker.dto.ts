import { IMappable } from '../../_abstractions';

export class MarkerDto implements IMappable {
  slug: string;
  lat: number;
  lng: number;

  mapFromJson(json: any): this {
    this.slug = json.slug;
    this.lat = json.lat;
    this.lng = json.lng;
    return this;
  }
}
