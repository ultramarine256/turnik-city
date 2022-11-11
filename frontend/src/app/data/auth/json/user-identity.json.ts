export class UserIdentityJson {
  email: string;
  imageUrl: string;
  fullName: string;
  role: string;
  permissions: string[];

  mapFromJson(json: any) {
    this.email = json.email;
    this.fullName = json.fullName;
    this.imageUrl = json.imageUrl;
    this.role = json.role;
    this.permissions = json.permissions;
  }
}
