import { IMappable } from '../../_abstractions';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';

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

  createdUtc: Date;
  likes: number;
  views: number;

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

    this.createdUtc = new Date(json.createdUtc);
    this.likes = json.likesCount;
    this.views = json.viewsCount;

    return this;
  }
}

export const PlaygroundTypes: { title: string; slug: string }[] = [
  {
    title: 'Modern',
    slug: 'modern',
  },
  {
    title: 'Aged',
    slug: 'soviet',
  },
  {
    title: 'Legendary',
    slug: 'legendary',
  },
];

export const PlaygroundSizes: { title: string; slug: string }[] = [
  {
    title: 'Small',
    slug: 'small',
  },
  {
    title: 'Medium',
    slug: 'medium',
  },
  {
    title: 'Large',
    slug: 'large',
  },
];
