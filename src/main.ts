import { HttpClient } from "./http-client";

export class Cilantro {
  private readonly httpClient: HttpClient;

  constructor(
    private readonly apiKey: string,
    private readonly baseAPIUrl: string
  ) {
    if (!this.apiKey) throw new Error("Please provide an apiKey");
    if (!this.baseAPIUrl) throw new Error("Please provide the baseAPIUrl");

    this.httpClient = new HttpClient(this.apiKey, this.baseAPIUrl);
  }
}
