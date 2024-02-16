import { expect, test } from "vitest";
import CatanBoardGenerator from "./CatanBoardGenerator";
import {
  ALGORITHM_COASTAL,
  ALGORITHM_RANDOM,
  ALGORITHM_THIN_LAND_MASS,
  PLAYERS_4,
} from "./constants";

test("Test CatanBoardGenerator returns correct serialised shape for the base 4 player game", () => {
  const board = new CatanBoardGenerator(false, PLAYERS_4, ALGORITHM_RANDOM);
  const serialisedBoard = board.toString();
  expect(serialisedBoard).toMatch(
    /^[WRSTBD]{3}-[WRSTBD]{4}-[WRSTBD]{5}-[WRSTBD]{4}-[WRSTBD]{3}$/,
  );
});

test("Test CatanBoardGenerator returns correct serialised shape for the seafarers 4 player game coastal algorithm", () => {
  const board = new CatanBoardGenerator(true, PLAYERS_4, ALGORITHM_COASTAL);
  const serialisedBoard = board.toString();
  expect(serialisedBoard).toMatch(
    /^[WRSTBDGO]{4}-[WRSTBDGO]{5}-[WRSTBDGO]{6}-[WRSTBDGO]{7}-[WRSTBDGO]{6}-[WRSTBDGO]{5}-[WRSTBDGO]{4}$/,
  );
});

test("Test CatanBoardGenerator returns correct serialised shape for the seafarers 4 player game thin land mass algorithm", () => {
  const board = new CatanBoardGenerator(
    true,
    PLAYERS_4,
    ALGORITHM_THIN_LAND_MASS,
  );
  const serialisedBoard = board.toString();
  expect(serialisedBoard).toMatch(
    /^[WRSTBDGO]{4}-[WRSTBDGO]{5}-[WRSTBDGO]{6}-[WRSTBDGO]{7}-[WRSTBDGO]{6}-[WRSTBDGO]{5}-[WRSTBDGO]{4}$/,
  );
});
