import fetch from "node-fetch";
import { URL } from "url";

export class HttpClient {
  constructor(
    private readonly apiKey: string,
    private readonly baseAPIUrl: string
  ) {}

  get(path: string): Promise<unknown> {
    return this.request(path, "GET");
  }

  post(path: string): Promise<unknown> {
    return this.request(path, "POST");
  }

  private async request(path: string, method: string): Promise<unknown> {
    const response = await fetch(new URL(path, this.baseAPIUrl), {
      method,
      headers: {
        "Auth-Key": this.apiKey,
      },
    });
    return await response.json();
  }
}
