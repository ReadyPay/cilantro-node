import { HttpClient } from "./http-client";
import { Item } from "./models/item";
import { JsonType } from "./json-util";

export class Cilantro {
  private readonly httpClient: HttpClient;

  constructor(
    private readonly apiKey: string,
    private readonly apiUrl: string
  ) {
    if (!this.apiKey) throw new Error("cilantro apiKey is required");
    if (!this.apiUrl) throw new Error("cilantro apiUrl is required");

    this.httpClient = new HttpClient(this.apiKey, this.apiUrl);
  }

  async getItems(locationId: number): Promise<Item[]> {
    const response = await this.httpClient.get<JsonType[]>(
      `/location/${locationId}/items`
    );
    return response.data.map((record) => Item.fromJSON(record));
  }
}
