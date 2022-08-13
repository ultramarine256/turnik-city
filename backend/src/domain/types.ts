export type Playground = {
  title: string;
  size: string;
  type: string;

  address: string;
  city: string;
  images: string[];
} & Location;

export type Location = {
  latitude: number | undefined;
  longitude: number | undefined;
};