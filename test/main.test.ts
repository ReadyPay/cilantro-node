import { Cilantro } from "../src/main";
import * as dotenv from "dotenv";

dotenv.config();

let cilantro: Cilantro;
beforeAll(() => {
  cilantro = new Cilantro(process.env.KEY ?? "", process.env.URL ?? "");
});

test("getItems", async () => {
  console.log(await cilantro.getItems(1));
});
