import { IMappable } from '../../_abstractions';

export class UserDto implements IMappable {
  email: string;
  imageUrl: string;
  fullName: string;

  mapFromJson(json: any): this {
    this.email = json.email;
    this.imageUrl = json.imageUrl;
    this.fullName = json.fullName;
    return this;
  }
}
