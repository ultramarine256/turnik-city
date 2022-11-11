import { IMappable } from '../../_abstract';

export class MarkerDto implements IMappable {
  id: number;
  slug: string;
  lat: number;
  lng: number;

  mapFromJson(json: any): this {
    this.id = json.id;
    this.slug = json.slug;
    this.lat = json.lat;
    this.lng = json.lng;
    return this;
  }
}
