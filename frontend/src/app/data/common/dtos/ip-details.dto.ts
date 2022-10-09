export class IpDetailsDto {
  ip: string;
  city: string;
  countryCode: string;
  lat: number;
  lng: number;

  mapFromJson(json: any): this {
    this.ip = json.ip;
    this.city = json.city;
    this.city = json.city;
    this.countryCode = json.country_code;
    return this;
  }
}
