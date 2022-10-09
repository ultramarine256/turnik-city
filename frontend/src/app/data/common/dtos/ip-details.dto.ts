export class IpDetailsDto {
  ip: string;
  city: string;
  countryCode: string;
  lat: number;
  lng: number;

  mapFromJson(json: any): this {
    this.ip = json.ip;
    this.city = json.city;
    this.countryCode = json.country_code;
    this.lat = json.latitude;
    this.lng = json.longitude;
    return this;
  }
}
