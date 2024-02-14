import {
  BASE_5_6_TILE_POOL,
  BASE_TILE_POOL,
  BOARD_SIZE,
  SEAFARERS_5_6_TILE_POOL,
  SEAFARERS_TILE_POOL,
  TILE_OCEAN,
} from "./constants";
import { range } from "./utils";

export default class CatanBoardGenerator {
  private algorithm: string;
  private tiles: { [key: string]: number };
  private grid: string[][];
  private gridCol: number;
  private gridRow: number;
  constructor(
    useSeafarers: boolean,
    numberOfPlayers: number,
    algorithm: string,
  ) {
    this.algorithm = algorithm;
    [this.gridCol, this.gridRow] =
      BOARD_SIZE[`${useSeafarers ? "seafarers" : "base"}-${numberOfPlayers}`];
    // Creates a 2D Array of size gridRow * gridCol filled with Ocean tiles.
    this.grid = [...Array(this.gridRow)].map((_) =>
      Array(this.gridCol).fill(TILE_OCEAN),
    );

    this.createGridBorders();

    this.tiles = structuredClone(BASE_TILE_POOL);

    if (useSeafarers) {
      this.updateTiles(SEAFARERS_TILE_POOL);
    }
    if (numberOfPlayers === 6) {
      this.updateTiles(BASE_5_6_TILE_POOL);
      if (useSeafarers) {
        this.updateTiles(SEAFARERS_5_6_TILE_POOL);
      }
    }

    this.colourGrid();
  }

  private updateTiles(additionalTiles: { [key: string]: number }) {
    for (const [key, value] of Object.entries(additionalTiles)) {
      this.tiles[key] += value;
    }
  }

  private createGridBordersIterator(iterator: number[]) {
    let cellsToNull = 1;

    for (let i of iterator) {
      let rightIndex = 0;
      let leftIndex = this.grid[i].length - 1;
      let useRightIndex = true;
      for (let j = 0; j < cellsToNull; j++) {
        if (useRightIndex) {
          this.grid[i][rightIndex] = "";
          rightIndex += 1;
        } else {
          this.grid[i][leftIndex] = "";
          leftIndex -= 1;
        }
        useRightIndex = !useRightIndex;
      }
      cellsToNull += 1;
    }
  }

  private createGridBorders() {
    /*
    This functions shapes the Grid so that it is the hexagon structure needed for Catan. It sets unused grid spaces
    as '' in an odd-r pattern:
    - From the centre row work towards the outer rows.
    - On each row remove 1 more hex than the previous row.
    - Remove from the right first, then alternate between left and right (required for odd rows).
     */
    const centreRow = Math.floor(this.grid.length / 2);
    // Top half: centreRow - 1, centreRow - 2, ..., 0
    this.createGridBordersIterator(range(0, centreRow - 1).reverse());
    // Bottom half: centreRow + 1, centreRow + 2, ..., grid.length
    this.createGridBordersIterator(range(centreRow + 1, this.grid.length - 1));
  }

  private colourGrid() {}

  toString() {
    // Joins all arrays with a "-" delimiter and then filters empty '' before concatenating into a string.
    return this.grid
      .reduce((a, b) => [...a, "-", ...b])
      .filter((x) => x !== "")
      .join("");
  }
}
