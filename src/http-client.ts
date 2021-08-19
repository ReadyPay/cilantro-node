import axios, { AxiosInstance, AxiosResponse } from "axios";
import { JsonSerializer, JsonType } from "./json-util";

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
    return this.formatResponse(
      await this.client.post<T>(path, this.formatRequestData(data))
    );
  }

  async patch<T>(path: string, data?: unknown): Promise<HttpResponse<T>> {
    return this.formatResponse(
      await this.client.patch<T>(path, this.formatRequestData(data))
    );
  }

  async delete<T>(path: string): Promise<HttpResponse<T>> {
    return this.formatResponse(await this.client.delete<T>(path));
  }

  private formatRequestData(data: unknown): JsonType {
    if (
      typeof data === "object" &&
      data !== null &&
      typeof (data as JsonSerializer).toJson === "function"
    ) {
      return (data as JsonSerializer).toJson();
    }
    return data as JsonType;
  }

  private formatResponse<T>(res: AxiosResponse<T>): HttpResponse<T> {
    return {
      data: res.data,
      status: res.status,
    };
  }
}
