import { HttpClient } from "./http-client";
import { Item } from "./models/item";
import { JsonDeserializer, JsonType } from "./json-util";
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
import { AdjustmentCreateRequest } from "./requests/adjustment-create.request";
import { AdjustmentUpdateRequest } from "./requests/adjustment-update.request";
import { TaxRate } from "./models/taxRate";
import { TaxRateCreateRequest } from "./requests/taxRate-create.request";
import { TaxRateUpdateRequest } from "./requests/taxRate-update.request";
import { PaymentTender } from "./models/paymentTender";
import { PaymentTenderUpdateRequest } from "./requests/paymentTender-update.request";
import { PaymentTenderCreateRequest } from "./requests/paymentTender-create.request";

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
    return this.createOne("/location", location, Location);
  }

  async getLocation(locationId: number): Promise<Location> {
    return this.getOne(`/location/${locationId}`, Location);
  }

  async updateLocation(location: LocationUpdateRequest): Promise<void> {
    await this.httpClient.patch<JsonType>(`/location/${location.id}`, location);
  }

  async deleteLocation(locationId: number): Promise<void> {
    await this.httpClient.delete<JsonType>(`/location/${locationId}`);
  }

  // Items

  async createItem(item: ItemCreateRequest): Promise<Item> {
    return this.createOne(`/location/${item.locationId}/item`, item, Item);
  }

  async getItem(locationId: number, itemId: number): Promise<Item> {
    return this.getOne(`/location/${locationId}/item/${itemId}`, Item);
  }

  async updateItem(item: ItemUpdateRequest): Promise<void> {
    await this.httpClient.patch<JsonType>(
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
    return this.getMany(`/location/${locationId}/items`, Item);
  }

  // Tables

  async createTable(table: TableCreateRequest): Promise<Table> {
    return this.createOne(`/location/${table.locationId}/table`, table, Table);
  }

  async getTable(locationId: number, tableId: number): Promise<Table> {
    return this.getOne(`/location/${locationId}/table/${tableId}`, Table);
  }

  async updateTable(table: TableUpdateRequest): Promise<void> {
    await this.httpClient.patch<JsonType>(
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
    return this.getMany(`/location/${locationId}/tables`, Table);
  }

  // Adjustments

  async createAdjustment(
    adjustment: AdjustmentCreateRequest
  ): Promise<Adjustment> {
    return this.createOne(
      `/location/${adjustment.locationId}/adjustment`,
      adjustment,
      Adjustment
    );
  }

  async getAdjustment(
    locationId: number,
    adjustmentId: number
  ): Promise<Adjustment> {
    return this.getOne(
      `/location/${locationId}/adjustment/${adjustmentId}`,
      Adjustment
    );
  }

  async updateAdjustment(adjustment: AdjustmentUpdateRequest): Promise<void> {
    await this.httpClient.patch<JsonType>(
      `/location/${adjustment.locationId}/adjustment/${adjustment.id}`,
      adjustment
    );
  }

  async deleteAdjustment(
    locationId: number,
    adjustmentId: number
  ): Promise<void> {
    await this.httpClient.delete<JsonType>(
      `/location/${locationId}/adjustment/${adjustmentId}`
    );
  }

  async getAdjustments(locationId: number): Promise<Adjustment[]> {
    return this.getMany(`/location/${locationId}/adjustments`, Adjustment);
  }

  // Tax Rates

  async createTaxRate(taxRate: TaxRateCreateRequest): Promise<TaxRate> {
    return this.createOne(
      `/location/${taxRate.locationId}/tax-rate`,
      taxRate,
      TaxRate
    );
  }

  async getTaxRate(locationId: number, taxRateId: number): Promise<TaxRate> {
    return this.getOne(
      `/location/${locationId}/tax-rate/${taxRateId}`,
      TaxRate
    );
  }

  async updateTaxRate(taxRate: TaxRateUpdateRequest): Promise<void> {
    await this.httpClient.patch<JsonType>(
      `/location/${taxRate.locationId}/tax-rate/${taxRate.id}`,
      taxRate
    );
  }

  async deleteTaxRate(locationId: number, taxRateId: number): Promise<void> {
    await this.httpClient.delete<JsonType>(
      `/location/${locationId}/tax-rate/${taxRateId}`
    );
  }

  // Payment Tenders

  async createPaymentTender(
    paymentTender: PaymentTenderCreateRequest
  ): Promise<PaymentTender> {
    return this.createOne(
      `/location/${paymentTender.locationId}/payment-tender`,
      paymentTender,
      PaymentTender
    );
  }

  async getPaymentTender(
    locationId: number,
    paymentTenderId: number
  ): Promise<PaymentTender> {
    return this.getOne(
      `/location/${locationId}/payment-tender/${paymentTenderId}`,
      PaymentTender
    );
  }

  async updatePaymentTender(
    paymentTender: PaymentTenderUpdateRequest
  ): Promise<void> {
    await this.httpClient.patch<JsonType>(
      `/location/${paymentTender.locationId}/payment-tender/${paymentTender.id}`,
      paymentTender
    );
  }

  async deletePaymentTender(
    locationId: number,
    paymentTenderId: number
  ): Promise<void> {
    await this.httpClient.delete<JsonType>(
      `/location/${locationId}/payment-tender/${paymentTenderId}`
    );
  }

  // Orders

  async priceCheck(request: PriceCheckRequest): Promise<PriceCheckResponse> {
    return this.createOne(
      `/location/${request.locationId}/price-check`,
      request,
      PriceCheckResponse
    );
  }

  async submitOrder(request: SubmitOrderRequest): Promise<SubmitOrderResponse> {
    return this.createOne(
      `/location/${request.locationId}/table/${request.tableId}/order`,
      request,
      SubmitOrderResponse
    );
  }

  // Helpers

  private async createOne<T>(
    url: string,
    data: unknown,
    returnClass: JsonDeserializer<T>
  ): Promise<T> {
    const response = await this.httpClient.post<JsonType>(url, data);
    return returnClass.fromJson(response.data);
  }

  private async getOne<T>(
    url: string,
    returnClass: JsonDeserializer<T>
  ): Promise<T> {
    const response = await this.httpClient.get<JsonType>(url);
    return returnClass.fromJson(response.data);
  }

  private async getMany<T>(
    url: string,
    returnClass: JsonDeserializer<T>
  ): Promise<T[]> {
    const response = await this.httpClient.get<JsonType[]>(url);
    return response.data.map((record) => returnClass.fromJson(record));
  }
}
