import axios, { AxiosInstance } from "axios";

export class HttpClient {
  private readonly client: AxiosInstance;

  constructor(
    private readonly apiKey: string,
    private readonly baseAPIUrl: string
  ) {
    this.client = axios.create({
      baseURL: this.baseAPIUrl,
      headers: {
        "Auth-Key": this.apiKey,
      },
    });
  }

  get(path: string): Promise<unknown> {
    return this.client.get(path);
  }

  post(path: string, data?: any): Promise<unknown> {
    return this.client.post(path, data);
  }
}
