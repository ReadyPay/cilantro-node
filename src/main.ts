import { HttpClient } from "./http-client";
import { Item } from "./models/item";
import { JsonType } from "./json-util";
import { Table } from "./models/table";
import { PriceCheckResponse } from "./responses/price-check.response";
import { PriceCheckRequest } from "./requests/price-check.request";
import { SubmitOrderRequest } from "./requests/submit-order.request";
import { SubmitOrderResponse } from "./responses/submit-order.response";
import { Adjustment } from "./models/adjustment";
import { Location } from "./models/location";
import { LocationCreateRequest } from "./requests/location-create.request";
import { LocationUpdateRequest } from "./requests/location-update.request";
import { ItemCreateRequest } from "./requests/item-create.request";
import { ItemUpdateRequest } from "./requests/item-update.request";
import { TableCreateRequest } from "./requests/table-create.request";
import { TableUpdateRequest } from "./requests/table-update.request";

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

  // Locations

  async createLocation(location: LocationCreateRequest): Promise<Location> {
    const response = await this.httpClient.post<JsonType>(
      "/location",
      location
    );
    return Location.fromJSON(response.data);
  }

  async getLocation(locationId: number): Promise<Location> {
    const response = await this.httpClient.get<JsonType>(
      `/location/${locationId}`
    );
    return Location.fromJSON(response.data);
  }

  async updateLocation(location: LocationUpdateRequest): Promise<void> {
    await this.httpClient.post<JsonType>(`/location/${location.id}`, location);
  }

  async deleteLocation(locationId: number): Promise<void> {
    await this.httpClient.delete<JsonType>(`/location/${locationId}`);
  }

  // Items

  async createItem(item: ItemCreateRequest): Promise<Item> {
    const response = await this.httpClient.post<JsonType>(
      `/location/${item.locationId}/item`,
      item
    );
    return Item.fromJSON(response.data);
  }

  async getItem(locationId: number, itemId: number): Promise<Item> {
    const response = await this.httpClient.get<JsonType>(
      `/location/${locationId}/item/${itemId}`
    );
    return Item.fromJSON(response.data);
  }

  async updateItem(item: ItemUpdateRequest): Promise<void> {
    await this.httpClient.post<JsonType>(
      `/location/${item.locationId}/item/${item.id}`,
      item
    );
  }

  async deleteItem(locationId: number, itemId: number): Promise<void> {
    await this.httpClient.delete<JsonType>(
      `/location/${locationId}/item/${itemId}`
    );
  }

  async getItems(locationId: number): Promise<Item[]> {
    const response = await this.httpClient.get<JsonType[]>(
      `/location/${locationId}/items`
    );
    return response.data.map((record) => Item.fromJSON(record));
  }

  // Tables

  async createTable(table: TableCreateRequest): Promise<Table> {
    const response = await this.httpClient.post<JsonType>(
      `/location/${table.locationId}/table`,
      table
    );
    return Table.fromJSON(response.data);
  }

  async getTable(locationId: number, tableId: number): Promise<Table> {
    const response = await this.httpClient.get<JsonType>(
      `/location/${locationId}/table/${tableId}`
    );
    return Table.fromJSON(response.data);
  }

  async updateTable(table: TableUpdateRequest): Promise<void> {
    await this.httpClient.post<JsonType>(
      `/location/${table.locationId}/table/${table.id}`,
      table
    );
  }

  async deleteTable(locationId: number, tableId: number): Promise<void> {
    await this.httpClient.delete<JsonType>(
      `/location/${locationId}/table/${tableId}`
    );
  }

  async getTables(locationId: number): Promise<Table[]> {
    const response = await this.httpClient.get<JsonType[]>(
      `/location/${locationId}/tables`
    );
    return response.data.map((record) => Table.fromJSON(record));
  }

  // Adjustments

  async getAdjustment(
    locationId: number,
    adjustmentId: number
  ): Promise<Adjustment> {
    const response = await this.httpClient.get<JsonType>(
      `/location/${locationId}/adjustment/${adjustmentId}`
    );
    return Adjustment.fromJSON(response.data);
  }

  async getAdjustments(locationId: number): Promise<Adjustment[]> {
    const response = await this.httpClient.get<JsonType[]>(
      `/location/${locationId}/adjustments`
    );
    return response.data.map((record) => Adjustment.fromJSON(record));
  }

  // Tax Rates

  // Payment Tenders

  // Orders

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
