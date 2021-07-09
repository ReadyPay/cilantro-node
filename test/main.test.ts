import { Cilantro } from "../src/main";
import * as dotenv from "dotenv";

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
