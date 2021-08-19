import { Cilantro } from "../src/main";
import * as dotenv from "dotenv";
import { PriceCheckRequest } from "../src/requests/price-check.request";
import { ItemRequest } from "../src/requests/item.request";
import { AdjustmentRequest } from "../src/requests/adjustment.request";
import { PaymentRequest } from "../src/requests/payment.request";
import { SubmitOrderRequest } from "../src/requests/submit-order.request";
import { Location } from "../src/models/location";
import { LocationCreateRequest } from "../src/requests/location-create.request";
import { LocationUpdateRequest } from "../src/requests/location-update.request";

dotenv.config();

let cilantro: Cilantro;
beforeAll(() => {
  cilantro = new Cilantro(process.env.KEY ?? "", process.env.URL ?? "");
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
