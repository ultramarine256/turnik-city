import { IMappable } from '../../_abstractions';

export class PlaygroundDto implements IMappable {
  id: number;
  slug: string;
  size: string;
  type: string;
  address: string;
  lat: number;
  lng: number;
  imageUrls: string[] = [];
  equipment: string[] = [];

  mapFromJson(json: any): this {
    this.id = json.id;
    this.slug = json.slug;
    this.size = json.size;
    this.type = json.type;
    this.address = json.address;
    this.lat = json.lat;
    this.lng = json.lng;
    this.imageUrls = json.imageUrls || [];
    this.equipment = json.equipment || [];
    return this;
  }
}
