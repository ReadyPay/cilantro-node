import axios, { AxiosInstance, AxiosResponse } from "axios";

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
    return this.formatResponse(await this.client.get<T>(path));
  }

  async post<T>(path: string, data?: unknown): Promise<HttpResponse<T>> {
    return this.formatResponse(await this.client.post<T>(path, data));
  }

  async patch<T>(path: string, data?: unknown): Promise<HttpResponse<T>> {
    return this.formatResponse(await this.client.patch<T>(path, data));
  }

  async delete<T>(path: string): Promise<HttpResponse<T>> {
    return this.formatResponse(await this.client.delete<T>(path));
  }

  private formatResponse<T>(res: AxiosResponse<T>): HttpResponse<T> {
    return {
      data: res.data,
      status: res.status,
    };
  }
}
