export type User = {
  password: string | null;
  id: string;
  name: string;
  refreshToken: string | null;
  accessToken: string | null;
  Token: string;
  twoFactorAuthenticationSecret: string | null;
  isTwoFactorAuthenticationEnabled: boolean | null;
  createdAt: Date;
}

export type RegisterUser = {
  username: string;
  password: string;
}

export type LoginUser = {
  username: string;
  password: string;
}