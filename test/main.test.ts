import { Cilantro } from "../src/main";

let cilantro: Cilantro;
beforeAll(() => {
  cilantro = new Cilantro(process.env.KEY!, process.env.URL!);
});

test("getItems", () => {
  console.log(process.env.KEY);
});
