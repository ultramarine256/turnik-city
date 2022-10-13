export class CountersDto {
  playgrounds: number;
  users: number;
  cities: number;
  likes: number;

  constructor(init?: Partial<CountersDto>) {
    Object.assign(this as any, init);
  }

  mapFromJson(json: any): this {
    this.playgrounds = json.playgrounds;
    this.users = json.users;
    this.cities = json.cities;
    this.likes = json.likes;
    return this;
  }
}
