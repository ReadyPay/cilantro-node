import { Cilantro } from "../src/main";
import * as dotenv from "dotenv";
import { Location } from "../src/models/location";
import { LocationCreateRequest } from "../src/requests/location-create.request";
import { LocationUpdateRequest } from "../src/requests/location-update.request";
import { ItemUpdateRequest } from "../src/requests/item-update.request";
import { ItemCreateRequest } from "../src/requests/item-create.request";
import { Item, ItemType } from "../src/models/item";
import { TaxRate } from "../src/models/taxRate";
import { TaxRateCreateRequest } from "../src/requests/taxRate-create.request";

dotenv.config();

let cilantro: Cilantro;

let dummyLocation: Location;
let dummyTaxRate: TaxRate;

beforeAll(async () => {
  cilantro = new Cilantro(process.env.KEY ?? "", process.env.URL ?? "");

  dummyLocation = await cilantro.createLocation(new LocationCreateRequest());
  dummyTaxRate = await cilantro.createTaxRate(
    new TaxRateCreateRequest(dummyLocation.id)
  );
});

afterAll(async () => {
  await cilantro.deleteTaxRate(dummyLocation.id, dummyTaxRate.id);
  await cilantro.deleteLocation(dummyLocation.id);
});

describe("locations", () => {
  let createdLocation: Location;

  test("create", async () => {
    const req = new LocationCreateRequest("my location", "1234 sesame st.");
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
    const req = new LocationUpdateRequest(createdLocation.id, "foo", "bar");
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
    const req = new ItemCreateRequest(
      dummyLocation.id,
      dummyTaxRate.id,
      ItemType.Item,
      true,
      "test item",
      "test desc",
      undefined,
      2.5,
      false
    );
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

  test("update", async () => {
    const req = new ItemUpdateRequest(
      createdItem.id,
      dummyLocation.id,
      undefined,
      ItemType.Modifier,
      false,
      ""
    );
    await cilantro.updateItem(req);
    const readItem = await cilantro.getItem(dummyLocation.id, req.id);
    expect(readItem.id).toBe(req.id);
    expect(readItem.locationId).toBe(req.locationId);
    expect(readItem.taxRateId).toBe(createdItem.taxRateId);
    expect(readItem.type).toBe(req.type);
    expect(readItem.enabled).toBe(req.enabled);
    expect(readItem.name).toBe(req.name);
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

//
// test("getItems", async () => {
//   console.log("getItems:", (await cilantro.getItems(1)).slice(0, 1));
// });
//
// test("getTables", async () => {
//   console.log("getTables:", (await cilantro.getTables(1)).slice(0, 1));
// });
//
// test("getTable", async () => {
//   console.log("getTable:", await cilantro.getTable(1, 1));
// });
//
// test("getAdjustments", async () => {
//   console.log(
//     "getAdjustments:",
//     (await cilantro.getAdjustments(1)).slice(0, 1)
//   );
// });
//
// test("getAdjustment", async () => {
//   console.log("getAdjustment:", await cilantro.getAdjustment(1, 2));
// });
//
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
