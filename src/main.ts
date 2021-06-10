import { HttpClient } from "./http-client";

export class Cilantro {
  private readonly httpClient: HttpClient;

  constructor(
    private readonly apiKey: string,
    private readonly baseAPIUrl: string
  ) {
    if (!this.apiKey) throw new Error("apiKey is required");
    if (!this.baseAPIUrl) throw new Error("baseAPIUrl is required");

    this.httpClient = new HttpClient(this.apiKey, this.baseAPIUrl);
  }
}
