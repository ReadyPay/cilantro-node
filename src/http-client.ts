import axios, { AxiosInstance } from "axios";

interface HttpResponse<T> {
  data: T;
  status: number;
}

export class HttpClient {
  private readonly client: AxiosInstance;

  constructor(
    private readonly apiKey: string,
    private readonly apiUrl: string
  ) {
    this.client = axios.create({
      baseURL: this.apiUrl,
      headers: {
        "Auth-Key": this.apiKey,
      },
    });
  }

  async get<T>(path: string): Promise<HttpResponse<T>> {
    const res = await this.client.get<T>(path);
    return {
      data: res.data,
      status: res.status,
    };
  }

  async post<T>(path: string, data?: any): Promise<HttpResponse<T>> {
    const res = await this.client.post<T>(path, data);
    return {
      data: res.data,
      status: res.status,
    };
  }
}
