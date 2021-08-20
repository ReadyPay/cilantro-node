import { Cilantro } from "../src/main";
import * as dotenv from "dotenv";
import { Location } from "../src/models/location";
import { LocationCreateRequest } from "../src/requests/location-create.request";
import { LocationUpdateRequest } from "../src/requests/location-update.request";
import { ItemUpdateRequest } from "../src/requests/item-update.request";
import { ItemCreateRequest } from "../src/requests/item-create.request";
import { Item, ItemType } from "../src/models/item";
import { TaxRate } from "../src/models/taxRate";
import { Table, TableShape } from "../src/models/table";
import { TableCreateRequest } from "../src/requests/table-create.request";
import { TableUpdateRequest } from "../src/requests/table-update.request";
import { AdjustmentUpdateRequest } from "../src/requests/adjustment-update.request";
import { AdjustmentCreateRequest } from "../src/requests/adjustment-create.request";
import {
  Adjustment,
  AdjustmentType,
  CalculationPhase,
} from "../src/models/adjustment";
import { TaxRateUpdateRequest } from "../src/requests/taxRate-update.request";
import { TaxRateCreateRequest } from "../src/requests/taxRate-create.request";

dotenv.config();

let cilantro: Cilantro;

let dummyLocation: Location;
let dummyTaxRate: TaxRate;

beforeAll(async () => {
  cilantro = new Cilantro(process.env.KEY ?? "", process.env.URL ?? "");

  dummyLocation = await cilantro.createLocation({});
  dummyTaxRate = await cilantro.createTaxRate({ locationId: dummyLocation.id });
});

afterAll(async () => {
  await cilantro.deleteTaxRate(dummyLocation.id, dummyTaxRate.id);
  await cilantro.deleteLocation(dummyLocation.id);
});

describe("locations", () => {
  let createdLocation: Location;

  test("create", async () => {
    const req: LocationCreateRequest = {
      name: "my location",
      address: "1234 sesame st.",
    };
    createdLocation = await cilantro.createLocation(req);
    expect(createdLocation.id).toBeGreaterThan(0);
    expect(createdLocation.name).toBe(req.name);
    expect(createdLocation.address).toBe(req.address);
  });

  test("read", async () => {
    const readLocation = await cilantro.getLocation(createdLocation.id);
    expect(readLocation.id).toBe(createdLocation.id);
    expect(readLocation.name).toBe(createdLocation.name);
    expect(readLocation.address).toBe(createdLocation.address);
  });

  test("update", async () => {
    const req: LocationUpdateRequest = {
      id: createdLocation.id,
      name: "foo",
      address: "bar",
    };
    await cilantro.updateLocation(req);
    const readLocation = await cilantro.getLocation(req.id);
    expect(readLocation.id).toBe(req.id);
    expect(readLocation.name).toBe(req.name);
    expect(readLocation.address).toBe(req.address);
  });

  test("delete", async () => {
    await cilantro.deleteLocation(createdLocation.id);
    try {
      await cilantro.getLocation(createdLocation.id);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});

describe("items", () => {
  let createdItem: Item;

  test("create", async () => {
    const req: ItemCreateRequest = {
      locationId: dummyLocation.id,
      taxRateId: dummyTaxRate.id,
      type: ItemType.Item,
      enabled: true,
      name: "test item",
      description: "test desc",
      price: 2.5,
      alcohol: true,
    };
    createdItem = await cilantro.createItem(req);
    expect(createdItem.id).toBeGreaterThan(0);
    expect(createdItem.locationId).toBe(req.locationId);
    expect(createdItem.taxRateId).toBe(req.taxRateId);
    expect(createdItem.type).toBe(req.type);
    expect(createdItem.enabled).toBe(req.enabled);
    expect(createdItem.name).toBe(req.name);
    expect(createdItem.description).toBe(req.description);
    expect(createdItem.imageUrl).toBe("");
    expect(createdItem.price).toBe(req.price);
    expect(createdItem.alcohol).toBe(req.alcohol);
  });

  test("read", async () => {
    const readItem = await cilantro.getItem(dummyLocation.id, createdItem.id);
    expect(readItem.id).toBe(createdItem.id);
    expect(readItem.locationId).toBe(createdItem.locationId);
    expect(readItem.taxRateId).toBe(createdItem.taxRateId);
    expect(readItem.type).toBe(createdItem.type);
    expect(readItem.enabled).toBe(createdItem.enabled);
    expect(readItem.name).toBe(createdItem.name);
    expect(readItem.description).toBe(createdItem.description);
    expect(readItem.imageUrl).toBe(createdItem.imageUrl);
    expect(readItem.price).toBe(createdItem.price);
    expect(readItem.alcohol).toBe(createdItem.alcohol);
  });

  test("read many", async () => {
    const items = await cilantro.getItems(dummyLocation.id);
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].id).toBeGreaterThan(0);
  });

  test("update", async () => {
    const req: ItemUpdateRequest = {
      id: createdItem.id,
      locationId: dummyLocation.id,
      type: ItemType.Modifier,
      enabled: false,
      name: "",
      description: "123 desc",
      imageUrl: "my image url",
      alcohol: false,
    };
    await cilantro.updateItem(req);
    const readItem = await cilantro.getItem(dummyLocation.id, req.id);
    expect(readItem.id).toBe(req.id);
    expect(readItem.locationId).toBe(req.locationId);
    expect(readItem.taxRateId).toBe(createdItem.taxRateId);
    expect(readItem.type).toBe(req.type);
    expect(readItem.enabled).toBe(req.enabled);
    expect(readItem.name).toBe(req.name);
    expect(readItem.description).toBe(req.description);
    expect(readItem.imageUrl).toBe(req.imageUrl);
    expect(readItem.price).toBe(createdItem.price);
    expect(readItem.alcohol).toBe(req.alcohol);
  });

  test("delete", async () => {
    await cilantro.deleteItem(dummyLocation.id, createdItem.id);
    try {
      await cilantro.getItem(dummyLocation.id, createdItem.id);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});

describe("tables", () => {
  let createdTable: Table;

  test("create", async () => {
    const req: TableCreateRequest = {
      locationId: dummyLocation.id,
      shape: TableShape.Square,
      name: "my table",
      yCoordinate: 36,
    };
    createdTable = await cilantro.createTable(req);
    expect(createdTable.id).toBeGreaterThan(0);
    expect(createdTable.locationId).toBe(req.locationId);
    expect(createdTable.shape).toBe(req.shape);
    expect(createdTable.name).toBe(req.name);
    expect(createdTable.xCoordinate).toBe(0);
    expect(createdTable.yCoordinate).toBe(req.yCoordinate);
  });

  test("read", async () => {
    const readTable = await cilantro.getTable(
      dummyLocation.id,
      createdTable.id
    );
    expect(readTable.id).toBe(createdTable.id);
    expect(readTable.locationId).toBe(createdTable.locationId);
    expect(readTable.shape).toBe(createdTable.shape);
    expect(readTable.name).toBe(createdTable.name);
    expect(readTable.xCoordinate).toBe(createdTable.xCoordinate);
    expect(readTable.yCoordinate).toBe(createdTable.yCoordinate);
  });

  test("read many", async () => {
    const tables = await cilantro.getTables(dummyLocation.id);
    expect(tables.length).toBeGreaterThan(0);
    expect(tables[0].id).toBeGreaterThan(0);
  });

  test("update", async () => {
    const req: TableUpdateRequest = {
      id: createdTable.id,
      locationId: dummyLocation.id,
      shape: TableShape.Rectangle,
      xCoordinate: 37,
    };
    await cilantro.updateTable(req);
    const readTable = await cilantro.getTable(dummyLocation.id, req.id);
    expect(readTable.id).toBe(req.id);
    expect(readTable.locationId).toBe(req.locationId);
    expect(readTable.shape).toBe(req.shape);
    expect(readTable.name).toBe(createdTable.name);
    expect(readTable.xCoordinate).toBe(req.xCoordinate);
    expect(readTable.yCoordinate).toBe(createdTable.yCoordinate);
  });

  test("delete", async () => {
    await cilantro.deleteTable(dummyLocation.id, createdTable.id);
    try {
      await cilantro.getTable(dummyLocation.id, createdTable.id);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});

describe("adjustments", () => {
  let createdAdjustment: Adjustment;

  test("create", async () => {
    const req: AdjustmentCreateRequest = {
      locationId: dummyLocation.id,
      type: AdjustmentType.Amount,
      calculationPhase: CalculationPhase.AfterTax,
      name: "test 1",
      value: 26,
      isOpenValue: true,
    };
    createdAdjustment = await cilantro.createAdjustment(req);
    expect(createdAdjustment.id).toBeGreaterThan(0);
    expect(createdAdjustment.locationId).toBe(req.locationId);
    expect(createdAdjustment.type).toBe(req.type);
    expect(createdAdjustment.calculationPhase).toBe(req.calculationPhase);
    expect(createdAdjustment.name).toBe(req.name);
    expect(createdAdjustment.value).toBe(req.value);
    expect(createdAdjustment.isOpenValue).toBe(req.isOpenValue);
  });

  test("read", async () => {
    const readAdjustment = await cilantro.getAdjustment(
      dummyLocation.id,
      createdAdjustment.id
    );
    expect(readAdjustment.id).toBe(createdAdjustment.id);
    expect(readAdjustment.locationId).toBe(createdAdjustment.locationId);
    expect(readAdjustment.type).toBe(createdAdjustment.type);
    expect(readAdjustment.calculationPhase).toBe(
      createdAdjustment.calculationPhase
    );
    expect(readAdjustment.name).toBe(createdAdjustment.name);
    expect(readAdjustment.value).toBe(createdAdjustment.value);
    expect(readAdjustment.isOpenValue).toBe(createdAdjustment.isOpenValue);
  });

  test("read many", async () => {
    const adjustments = await cilantro.getAdjustments(dummyLocation.id);
    expect(adjustments.length).toBeGreaterThan(0);
    expect(adjustments[0].id).toBeGreaterThan(0);
  });

  test("update", async () => {
    const req: AdjustmentUpdateRequest = {
      id: createdAdjustment.id,
      locationId: dummyLocation.id,
      calculationPhase: CalculationPhase.BeforeTax,
      value: 34,
      isOpenValue: false,
    };
    await cilantro.updateAdjustment(req);
    const readAdjustment = await cilantro.getAdjustment(
      dummyLocation.id,
      req.id
    );
    expect(readAdjustment.id).toBe(createdAdjustment.id);
    expect(readAdjustment.locationId).toBe(createdAdjustment.locationId);
    expect(readAdjustment.type).toBe(createdAdjustment.type);
    expect(readAdjustment.calculationPhase).toBe(req.calculationPhase);
    expect(readAdjustment.name).toBe(createdAdjustment.name);
    expect(readAdjustment.value).toBe(req.value);
    expect(readAdjustment.isOpenValue).toBe(req.isOpenValue);
  });

  test("delete", async () => {
    await cilantro.deleteAdjustment(dummyLocation.id, createdAdjustment.id);
    try {
      await cilantro.getAdjustment(dummyLocation.id, createdAdjustment.id);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});

describe("taxRates", () => {
  let createdTaxRate: TaxRate;

  test("create", async () => {
    const req: TaxRateCreateRequest = {
      locationId: dummyLocation.id,
      name: "foo",
      rate: 0.65,
    };
    createdTaxRate = await cilantro.createTaxRate(req);
    expect(createdTaxRate.id).toBeGreaterThan(0);
    expect(createdTaxRate.locationId).toBe(req.locationId);
    expect(createdTaxRate.name).toBe(req.name);
    expect(createdTaxRate.rate).toBe(req.rate);
  });

  test("read", async () => {
    const readTaxRate = await cilantro.getTaxRate(
      dummyLocation.id,
      createdTaxRate.id
    );
    expect(readTaxRate.id).toBe(createdTaxRate.id);
    expect(readTaxRate.locationId).toBe(createdTaxRate.locationId);
    expect(readTaxRate.name).toBe(createdTaxRate.name);
    expect(readTaxRate.rate).toBe(createdTaxRate.rate);
  });

  test("update", async () => {
    const req: TaxRateUpdateRequest = {
      id: createdTaxRate.id,
      locationId: dummyLocation.id,
      rate: 0,
    };
    await cilantro.updateTaxRate(req);
    const readTaxRate = await cilantro.getTaxRate(dummyLocation.id, req.id);
    expect(readTaxRate.id).toBe(createdTaxRate.id);
    expect(readTaxRate.locationId).toBe(createdTaxRate.locationId);
    expect(readTaxRate.name).toBe(createdTaxRate.name);
    expect(readTaxRate.rate).toBe(req.rate);
  });

  test("delete", async () => {
    await cilantro.deleteTaxRate(dummyLocation.id, createdTaxRate.id);
    try {
      await cilantro.getTaxRate(dummyLocation.id, createdTaxRate.id);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});

// test("priceCheck", async () => {
//   console.log(
//     "priceCheck:",
//     await cilantro.priceCheck(
//       new PriceCheckRequest(
//         1,
//         [new ItemRequest(1, 1)],
//         [new AdjustmentRequest(1)],
//         [new PaymentRequest(1, 42)]
//       )
//     )
//   );
// });
//
// test("submitOrder", async () => {
//   console.log(
//     "submitOrder:",
//     await cilantro.submitOrder(
//       new SubmitOrderRequest(
//         1,
//         1,
//         [new ItemRequest(1, 1)],
//         [new AdjustmentRequest(1)],
//         [new PaymentRequest(1, 42)]
//       )
//     )
//   );
// });
