import {
  BASE_5_6_TILE_POOL,
  BASE_TILE_POOL,
  BOARD_SIZE,
  SEAFARERS_5_6_TILE_POOL,
  SEAFARERS_TILE_POOL,
} from "@/lib/constants";

class CatanBoardGenerator {
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
      BOARD_SIZE[`${"seafarers" ? useSeafarers : "base"}-${numberOfPlayers}`];
    // Creates a 2D Array of size gridCol * gridRow filled with Ocean tiles.
    this.grid = [...Array(this.gridCol)].map((_) =>
      Array(this.gridRow).fill("O"),
    );

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
  }

  updateTiles(additionalTiles: { [key: string]: number }) {
    for (const [key, value] of Object.entries(additionalTiles)) {
      this.tiles[key] += value;
    }
  }

  createGridBorders() {
    // Odd-r: start trimming from end of arrays (alternate back to start for n > 1).
  }
}
