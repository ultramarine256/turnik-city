export type PlaygroundDto = {
  id: number;
  slug: string;
  size: string;
  type: string;
  address: string;
  lat: number;
  lng: number;
  imageUrls: string[];
  equipment: string[];
  createdUtc: Date;
  likes: number;
  views: number;
};

export enum PLAYGROUND_TYPE {
  MODERN = 'modern',
  AGED = 'aged',
}

export enum PLAYGROUND_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export const PlaygroundTypes = [
  {
    title: 'Modern',
    slug: PLAYGROUND_TYPE.MODERN,
  },
  {
    title: 'Aged',
    slug: PLAYGROUND_TYPE.AGED,
  },
];

export const PlaygroundSizes = [
  {
    title: 'Small',
    slug: PLAYGROUND_SIZE.SMALL,
  },
  {
    title: 'Medium',
    slug: PLAYGROUND_SIZE.MEDIUM,
  },
  {
    title: 'Large',
    slug: PLAYGROUND_SIZE.LARGE,
  },
];
