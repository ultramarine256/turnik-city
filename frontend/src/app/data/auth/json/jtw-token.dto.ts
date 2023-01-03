export type JtwTokenDto = {
  issuer: string;
  audiences: string[];
  token: string;
  tokenType: string;
  username: string;
  expireDateTimeUtc: Date;
};

export type JtwTokenResponse = {
  status: 'ok' | 'wrong-password' | 'api-down';
  data: JtwTokenDto;
};

export type RegistrationResponse = {
  status: 'ok' | 'email-already-exist' | 'block' | 'api-down';
  data: JtwTokenDto;
};
