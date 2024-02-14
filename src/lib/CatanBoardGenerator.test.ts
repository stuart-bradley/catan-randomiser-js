import { expect, test } from "vitest";
import CatanBoardGenerator from "./CatanBoardGenerator";

test("Test CatanBoardGenerator returns correct serialised shape for the base 4 player game", () => {
  const board = new CatanBoardGenerator(false, 4, "random");
  const serialisedBoard = board.toString();
  expect(serialisedBoard).toMatch(/^\w{3}-\w{4}-\w{5}-\w{4}-\w{3}$/);
});
