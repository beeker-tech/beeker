export interface AccessToken {
  iss: string;
  sub: string;
  id: string;
  aud: string;
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  permissions: string[];
}
