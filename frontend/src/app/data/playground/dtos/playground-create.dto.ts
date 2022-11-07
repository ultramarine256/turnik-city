export class PlaygroundCreateDto {
  size: string;
  type: string;
  lat: number;
  lng: number;
  imageUrls: string[] = [];

  constructor(init?: Partial<PlaygroundCreateDto>) {
    Object.assign(this as any, init);
  }
}
