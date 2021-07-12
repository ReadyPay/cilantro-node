import { Cilantro } from "../src/main";
import * as dotenv from "dotenv";
import { PriceCheckRequest } from "../src/requests/price-check.request";
import { ItemRequest } from "../src/requests/item.request";
import { AdjustmentRequest } from "../src/requests/adjustment.request";
import { PaymentRequest } from "../src/requests/payment.request";
import { SubmitOrderRequest } from "../src/requests/submit-order.request";

dotenv.config();

let cilantro: Cilantro;
beforeAll(() => {
  cilantro = new Cilantro(process.env.KEY ?? "", process.env.URL ?? "");
});

test("getItems", async () => {
  console.log("getItems:", (await cilantro.getItems(1)).slice(0, 1));
});

test("getTables", async () => {
  console.log("getTables:", (await cilantro.getTables(1)).slice(0, 1));
});

test("getTable", async () => {
  console.log("getTable:", await cilantro.getTable(1, 1));
});

test("priceCheck", async () => {
  console.log(
    "priceCheck:",
    await cilantro.priceCheck(
      new PriceCheckRequest(
        1,
        [new ItemRequest(1)],
        [new AdjustmentRequest(1)],
        [new PaymentRequest(1, 42)]
      )
    )
  );
});

test("submitOrder", async () => {
  console.log(
    "submitOrder:",
    await cilantro.submitOrder(
      new SubmitOrderRequest(
        1,
        1,
        [new ItemRequest(1)],
        [new AdjustmentRequest(1)],
        [new PaymentRequest(1, 42)]
      )
    )
  );
});
