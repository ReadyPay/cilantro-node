import fetch, { BodyInit, RequestInit } from "node-fetch";
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

  private async request(
    path: string,
    method: string,
    body?: BodyInit
  ): Promise<unknown> {
    const options: RequestInit = {
      method,
      headers: {
        "Auth-Key": this.apiKey,
      },
    };
    if (body) {
      options.body = body;
    }
    const response = await fetch(new URL(path, this.baseAPIUrl), options);
    return await response.json();
  }
}
