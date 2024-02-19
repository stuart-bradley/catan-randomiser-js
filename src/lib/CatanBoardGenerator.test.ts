import { expect, test } from "vitest";
import CatanBoardGenerator from "./CatanBoardGenerator";
import {
  ALGORITHM_COASTAL,
  ALGORITHM_LARGE_LAND_MASS,
  ALGORITHM_RANDOM,
  ALGORITHM_SMALL_ISLANDS,
  ALGORITHM_LARGE_ISLANDS,
  ALGORITHM_THIN_LAND_MASS,
  PLAYERS_4,
  PLAYERS_6,
} from "./constants";

const player4BaseRegex = new RegExp(
  /^[WRSTBD]{3}-[WRSTBD]{4}-[WRSTBD]{5}-[WRSTBD]{4}-[WRSTBD]{3}$/,
);
const player6BaseRegex = new RegExp(
  /^[WRSTBD]{3}-[WRSTBD]{4}-[WRSTBD]{5}-[WRSTBD]{6}-[WRSTBD]{5}-[WRSTBD]{4}-[WRSTBD]{3}$/,
);
const player4SeafarersRegex = new RegExp(
  /^[WRSTBDGO]{4}-[WRSTBDGO]{5}-[WRSTBDGO]{6}-[WRSTBDGO]{7}-[WRSTBDGO]{6}-[WRSTBDGO]{5}-[WRSTBDGO]{4}$/,
);
const player6SeafarersRegex = new RegExp(
  /^[WRSTBDGO]{7}-[WRSTBDGO]{8}-[WRSTBDGO]{9}-[WRSTBDGO]{10}-[WRSTBDGO]{9}-[WRSTBDGO]{8}-[WRSTBDGO]{7}$/,
);

test.each([
  {
    useSeafarers: false,
    numOfPlayers: PLAYERS_4,
    algorithm: ALGORITHM_RANDOM,
    expected: player4BaseRegex,
  },
  {
    useSeafarers: false,
    numOfPlayers: PLAYERS_6,
    algorithm: ALGORITHM_RANDOM,
    expected: player6BaseRegex,
  },
  {
    useSeafarers: true,
    numOfPlayers: PLAYERS_4,
    algorithm: ALGORITHM_COASTAL,
    expected: player4SeafarersRegex,
  },
  {
    useSeafarers: true,
    numOfPlayers: PLAYERS_6,
    algorithm: ALGORITHM_COASTAL,
    expected: player6SeafarersRegex,
  },
  {
    useSeafarers: true,
    numOfPlayers: PLAYERS_4,
    algorithm: ALGORITHM_THIN_LAND_MASS,
    expected: player4SeafarersRegex,
  },
  {
    useSeafarers: true,
    numOfPlayers: PLAYERS_6,
    algorithm: ALGORITHM_THIN_LAND_MASS,
    expected: player6SeafarersRegex,
  },
  {
    useSeafarers: true,
    numOfPlayers: PLAYERS_4,
    algorithm: ALGORITHM_LARGE_LAND_MASS,
    expected: player4SeafarersRegex,
  },
  {
    useSeafarers: true,
    numOfPlayers: PLAYERS_6,
    algorithm: ALGORITHM_LARGE_LAND_MASS,
    expected: player6SeafarersRegex,
  },
  {
    useSeafarers: true,
    numOfPlayers: PLAYERS_4,
    algorithm: ALGORITHM_SMALL_ISLANDS,
    expected: player4SeafarersRegex,
  },
  {
    useSeafarers: true,
    numOfPlayers: PLAYERS_6,
    algorithm: ALGORITHM_SMALL_ISLANDS,
    expected: player6SeafarersRegex,
  },
  {
    useSeafarers: true,
    numOfPlayers: PLAYERS_4,
    algorithm: ALGORITHM_LARGE_ISLANDS,
    expected: player4SeafarersRegex,
  },
  {
    useSeafarers: true,
    numOfPlayers: PLAYERS_6,
    algorithm: ALGORITHM_LARGE_ISLANDS,
    expected: player6SeafarersRegex,
  },
])(
  "Test CatanBoardGenerator returns correct serialised shape for a $numOfPlayers player game using $algorithm algorithm (Seafarers: $useSeafarers)",
  ({ useSeafarers, numOfPlayers, algorithm, expected }) => {
    const board = new CatanBoardGenerator(
      useSeafarers,
      numOfPlayers,
      algorithm,
    );
    const serialisedBoard = board.toString();
    expect(serialisedBoard).toMatch(expected);
  },
);
