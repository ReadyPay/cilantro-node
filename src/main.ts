import { HttpClient } from "./http-client";
import { Item } from "./models/item";
import { JsonType } from "./json-util";
import { Table } from "./models/table";
import { PriceCheckResponse } from "./responses/price-check.response";
import { PriceCheckRequest } from "./requests/price-check.request";
import {SubmitOrderRequest} from "./requests/submit-order.request";
import {SubmitOrderResponse} from "./responses/submit-order.response";

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

  async getTables(locationId: number): Promise<Table[]> {
    const response = await this.httpClient.get<JsonType[]>(
      `/location/${locationId}/tables`
    );
    return response.data.map((record) => Table.fromJSON(record));
  }

  async getTable(locationId: number, tableId: number): Promise<Table> {
    const response = await this.httpClient.get<JsonType>(
      `/location/${locationId}/table/${tableId}`
    );
    return Table.fromJSON(response.data);
  }

  async priceCheck(request: PriceCheckRequest): Promise<PriceCheckResponse> {
    const response = await this.httpClient.post<JsonType>(
      `/location/${request.locationId}/price-check`,
      request.toJSON()
    );
    return PriceCheckResponse.fromJSON(response.data);
  }

  async submitOrder(request: SubmitOrderRequest): Promise<SubmitOrderResponse> {
    const response = await this.httpClient.post<JsonType>(
      `/location/${request.locationId}/table/${request.tableId}/order`,
      request.toJSON()
    );
    return SubmitOrderResponse.fromJSON(response.data);
  }
}
