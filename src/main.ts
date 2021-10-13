import { HttpClient } from "./http-client";
import { Item } from "./models/item";
import { JsonDeserializer, JsonType } from "./json-util";
import { Table } from "./models/table";
import { PriceCheckResponse } from "./responses/price-check.response";
import {
  PriceCheckRequest,
  priceCheckRequestToJson,
} from "./requests/price-check.request";
import {
  SubmitOrderRequest,
  submitOrderRequestToJson,
} from "./requests/submit-order.request";
import { SubmitOrderResponse } from "./responses/submit-order.response";
import { Adjustment } from "./models/adjustment";
import { Location } from "./models/location";
import {
  LocationCreateRequest,
  locationCreateRequestToJson,
} from "./requests/location-create.request";
import {
  LocationUpdateRequest,
  locationUpdateRequestToJson,
} from "./requests/location-update.request";
import {
  ItemCreateRequest,
  itemCreateRequestToJson,
} from "./requests/item-create.request";
import {
  ItemUpdateRequest,
  itemUpdateRequestToJson,
} from "./requests/item-update.request";
import {
  TableCreateRequest,
  tableCreateRequestToJson,
} from "./requests/table-create.request";
import {
  TableUpdateRequest,
  tableUpdateRequestToJson,
} from "./requests/table-update.request";
import {
  AdjustmentCreateRequest,
  adjustmentCreateRequestToJson,
} from "./requests/adjustment-create.request";
import {
  AdjustmentUpdateRequest,
  adjustmentUpdateRequestToJson,
} from "./requests/adjustment-update.request";
import { TaxRate } from "./models/taxRate";
import {
  TaxRateCreateRequest,
  taxRateCreateRequestToJson,
} from "./requests/taxRate-create.request";
import {
  TaxRateUpdateRequest,
  taxRateUpdateRequestToJson,
} from "./requests/taxRate-update.request";
import { PaymentTender } from "./models/paymentTender";
import {
  PaymentTenderUpdateRequest,
  paymentTenderUpdateRequestToJson,
} from "./requests/paymentTender-update.request";
import {
  PaymentTenderCreateRequest,
  paymentTenderCreateRequestToJson,
} from "./requests/paymentTender-create.request";
import { Company } from "./models/company";
import { CompanyCreateRequest } from "./requests/company-create.request";
import { CompanyUpdateRequest } from "./requests/company-update.request";

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

  // Companies

  async createCompany(company: CompanyCreateRequest): Promise<Company> {
    return this.createOne("/company", company, Company);
  }

  async getCompany(companyId: number): Promise<Company> {
    return this.getOne(`/company/${companyId}`, Company);
  }

  async updateCompany(company: CompanyUpdateRequest): Promise<void> {
    await this.httpClient.patch<void>(`/company/${company.id}`, company);
  }

  async deleteCompany(companyId: number): Promise<void> {
    await this.httpClient.delete<void>(`/company/${companyId}`);
  }

  // Locations

  async createLocation(location: LocationCreateRequest): Promise<Location> {
    return this.createOne(
      "/location",
      locationCreateRequestToJson(location),
      Location
    );
  }

  async getLocation(locationId: number): Promise<Location> {
    return this.getOne(`/location/${locationId}`, Location);
  }

  async updateLocation(location: LocationUpdateRequest): Promise<void> {
    await this.httpClient.patch<void>(
      `/location/${location.id}`,
      locationUpdateRequestToJson(location)
    );
  }

  async deleteLocation(locationId: number): Promise<void> {
    await this.httpClient.delete<void>(`/location/${locationId}`);
  }

  // Items

  async createItem(item: ItemCreateRequest): Promise<Item> {
    return this.createOne(
      `/location/${item.locationId}/item`,
      itemCreateRequestToJson(item),
      Item
    );
  }

  async getItem(locationId: number, itemId: number): Promise<Item> {
    return this.getOne(`/location/${locationId}/item/${itemId}`, Item);
  }

  async updateItem(item: ItemUpdateRequest): Promise<void> {
    await this.httpClient.patch<void>(
      `/location/${item.locationId}/item/${item.id}`,
      itemUpdateRequestToJson(item)
    );
  }

  async deleteItem(locationId: number, itemId: number): Promise<void> {
    await this.httpClient.delete<void>(
      `/location/${locationId}/item/${itemId}`
    );
  }

  async getItems(locationId: number): Promise<Item[]> {
    return this.getMany(`/location/${locationId}/items`, Item);
  }

  // Tables

  async createTable(table: TableCreateRequest): Promise<Table> {
    return this.createOne(
      `/location/${table.locationId}/table`,
      tableCreateRequestToJson(table),
      Table
    );
  }

  async getTable(locationId: number, tableId: number): Promise<Table> {
    return this.getOne(`/location/${locationId}/table/${tableId}`, Table);
  }

  async updateTable(table: TableUpdateRequest): Promise<void> {
    await this.httpClient.patch<void>(
      `/location/${table.locationId}/table/${table.id}`,
      tableUpdateRequestToJson(table)
    );
  }

  async deleteTable(locationId: number, tableId: number): Promise<void> {
    await this.httpClient.delete<void>(
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
      adjustmentCreateRequestToJson(adjustment),
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
    await this.httpClient.patch<void>(
      `/location/${adjustment.locationId}/adjustment/${adjustment.id}`,
      adjustmentUpdateRequestToJson(adjustment)
    );
  }

  async deleteAdjustment(
    locationId: number,
    adjustmentId: number
  ): Promise<void> {
    await this.httpClient.delete<void>(
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
      taxRateCreateRequestToJson(taxRate),
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
    await this.httpClient.patch<void>(
      `/location/${taxRate.locationId}/tax-rate/${taxRate.id}`,
      taxRateUpdateRequestToJson(taxRate)
    );
  }

  async deleteTaxRate(locationId: number, taxRateId: number): Promise<void> {
    await this.httpClient.delete<void>(
      `/location/${locationId}/tax-rate/${taxRateId}`
    );
  }

  // Payment Tenders

  async createPaymentTender(
    paymentTender: PaymentTenderCreateRequest
  ): Promise<PaymentTender> {
    return this.createOne(
      `/location/${paymentTender.locationId}/payment-tender`,
      paymentTenderCreateRequestToJson(paymentTender),
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
    await this.httpClient.patch<void>(
      `/location/${paymentTender.locationId}/payment-tender/${paymentTender.id}`,
      paymentTenderUpdateRequestToJson(paymentTender)
    );
  }

  async deletePaymentTender(
    locationId: number,
    paymentTenderId: number
  ): Promise<void> {
    await this.httpClient.delete<void>(
      `/location/${locationId}/payment-tender/${paymentTenderId}`
    );
  }

  // Orders

  async priceCheck(request: PriceCheckRequest): Promise<PriceCheckResponse> {
    return this.createOne(
      `/location/${request.locationId}/price-check`,
      priceCheckRequestToJson(request),
      PriceCheckResponse
    );
  }

  async submitOrder(request: SubmitOrderRequest): Promise<SubmitOrderResponse> {
    return this.createOne(
      `/location/${request.locationId}/table/${request.tableId}/order`,
      submitOrderRequestToJson(request),
      SubmitOrderResponse
    );
  }

  async deleteOrder(locationId: number, orderId: number): Promise<void> {
    await this.httpClient.delete<void>(
      `/location/${locationId}/order/${orderId}`
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
