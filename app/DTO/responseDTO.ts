export class AuthResponse {
    constructor(
      public access_token: string,
      public refresh_token: string,
      public expires_in: number,
      public refresh_expires_in: number,
      public token_type: string
    ) {}
  }
  