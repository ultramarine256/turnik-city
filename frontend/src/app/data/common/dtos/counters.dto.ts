export class CountersDto {
  playgrounds: number;
  users: number;
  cities: number;
  likes: number;

  newMembers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  newLocations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
