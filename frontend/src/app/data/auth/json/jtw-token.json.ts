export class JtwTokenJson {
  issuer: string;
  audiences: string[];
  token: string;
  tokenType: string;
  username: string;
  expireDateTimeUtc: Date;

  mapFromJson(json: any) {
    this.issuer = json.issuer;
    this.audiences = json.audiences;
    this.token = json.token;
    this.tokenType = json.tokenType;
    this.username = json.username;
    this.expireDateTimeUtc = new Date(json.expireDateTimeUtc);
  }
}

export type JtwTokenResponse = {
  status: 'ok' | 'wrong-password' | 'api-down';
  data: JtwTokenJson;
};

export type RegistrationResponseDto = {
  status: 'ok' | 'email-already-exist' | 'block' | 'api-down';
  data: JtwTokenJson;
};
