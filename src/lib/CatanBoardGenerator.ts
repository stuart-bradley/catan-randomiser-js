import {
  ALGORITHM_COASTAL,
  ALGORITHM_LARGE_ISLANDS,
  ALGORITHM_LARGE_LAND_MASS,
  ALGORITHM_RANDOM,
  ALGORITHM_SMALL_ISLANDS,
  ALGORITHM_THIN_LAND_MASS,
  BASE_5_6_TILE_POOL,
  BASE_TILE_POOL,
  BOARD_SIZE,
  LAND_TILES,
  PLAYERS_6,
  SEAFARERS_5_6_TILE_POOL,
  SEAFARERS_TILE_POOL,
  TILE_BRICK,
  TILE_DESERT,
  TILE_EDGE,
  TILE_GOLD,
  TILE_OCEAN,
  TILE_ROCK,
  TILE_SHEEP,
  TILE_TREE,
  TILE_WHEAT,
} from "./constants";
import { getRandomInt, range } from "./utils";

export default class CatanBoardGenerator {
  private algorithm: string;
  private gridCol: number;
  private gridRow: number;
  private grid: string[][];
  private validGridPositions: Set<string>;
  private tiles: { [key: string]: number };
  constructor(
    useSeafarers: boolean,
    numberOfPlayers: string,
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

    this.validGridPositions = new Set();
    this.initialiseValidGridPositions();

    this.tiles = structuredClone(BASE_TILE_POOL);
    if (useSeafarers) {
      this.updateTiles(SEAFARERS_TILE_POOL);
    }
    if (numberOfPlayers === PLAYERS_6) {
      this.updateTiles(BASE_5_6_TILE_POOL);
      if (useSeafarers) {
        this.updateTiles(SEAFARERS_5_6_TILE_POOL);
      }
    }

    this.colourGrid();
  }

  private initialiseValidGridPositions(): void {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] !== TILE_EDGE) {
          // Can't add Array objects to a Set, so string objects will do.
          this.validGridPositions.add(`${i},${j}`);
        }
      }
    }
  }

  private updateTiles(additionalTiles: { [key: string]: number }): void {
    for (const [key, value] of Object.entries(additionalTiles)) {
      this.tiles[key] += value;
    }
  }

  private createGridBordersIterator(iterator: number[]): void {
    let cellsToNull = 1;

    for (let i of iterator) {
      let rightIndex = 0;
      let leftIndex = this.grid[i].length - 1;
      let useRightIndex = true;
      for (let j = 0; j < cellsToNull; j++) {
        if (useRightIndex) {
          this.grid[i][rightIndex] = TILE_EDGE;
          rightIndex += 1;
        } else {
          this.grid[i][leftIndex] = TILE_EDGE;
          leftIndex -= 1;
        }
        useRightIndex = !useRightIndex;
      }
      cellsToNull += 1;
    }
  }

  private createGridBorders(): void {
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

  private getRandomValidTile(): string {
    // Returns a random tile which has at least one left in the tile pool.
    const filteredTiles = Object.keys(this.tiles).reduce(
      (filtered: { [key: string]: number }, key) => {
        if (this.tiles[key] > 0) {
          filtered[key] = this.tiles[key];
        }
        return filtered;
      },
      {},
    );
    const filteredKeys = Object.keys(filteredTiles);
    const randomFilteredTileKey =
      filteredKeys[(filteredKeys.length * Math.random()) << 0];
    this.tiles[randomFilteredTileKey] -= 1;
    return randomFilteredTileKey;
  }

  private getOceanTile(): string {
    /*
    Gets an ocean tile either from:
    1. The ocean tile pool.
    2. A random other tile pool.
     */
    if (this.tiles[TILE_OCEAN] > 0) {
      this.tiles[TILE_OCEAN] -= 1;
    } else {
      // Ignore return value as the tile just gets flipped.
      this.getRandomValidTile();
    }
    return TILE_OCEAN;
  }

  private getNeighbourLandsCount(i: number, j: number): number {
    // https://www.redblobgames.com/grids/hexagons/#neighbors
    let neighbourLands = 0;
    console.log();
    const neighbourCoords = [
      [
        [1, 0],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
      ],
      [
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 1],
      ],
    ];
    const parity = i & 1;
    const neighboursToCheck = neighbourCoords[parity];
    for (let [deltaI, deltaJ] of neighboursToCheck) {
      const neighbourI = i + deltaI;
      const neighbourJ = j + deltaJ;
      if (
        this.grid[neighbourI] !== undefined &&
        this.grid[neighbourI][neighbourJ] !== undefined &&
        LAND_TILES.has(this.grid[neighbourI][neighbourJ])
      ) {
        neighbourLands += 1;
      } else {
        console.log(deltaI, deltaJ);
      }
    }
    return neighbourLands;
  }

  private coastalTilePicker(): string {
    const randNum = getRandomInt(1, 8);
    let tile = null;
    switch (randNum) {
      case 1:
        if (this.tiles[TILE_WHEAT] > 0) {
          this.tiles[TILE_WHEAT] -= 1;
          tile = TILE_WHEAT;
        }
        break;
      case 2:
        if (this.tiles[TILE_SHEEP] > 0) {
          this.tiles[TILE_SHEEP] -= 1;
          tile = TILE_SHEEP;
        }
        break;
      case 3:
        if (this.tiles[TILE_ROCK] > 0) {
          this.tiles[TILE_ROCK] -= 1;
          tile = TILE_ROCK;
        }
        break;
      case 4:
        if (this.tiles[TILE_TREE] > 0) {
          this.tiles[TILE_TREE] -= 1;
          tile = TILE_TREE;
        }
        break;
      case 5:
        if (this.tiles[TILE_BRICK] > 0) {
          this.tiles[TILE_BRICK] -= 1;
          tile = TILE_BRICK;
        }
        break;
      case 6:
        if (this.tiles[TILE_DESERT] > 0) {
          this.tiles[TILE_DESERT] -= 1;
          tile = TILE_DESERT;
        }
        break;
      case 7:
        if (this.tiles[TILE_GOLD] > 0) {
          this.tiles[TILE_GOLD] -= 1;
          tile = TILE_GOLD;
        }
        break;
    }
    if (tile === null) {
      tile = this.getOceanTile();
    }
    return tile;
  }

  private thinLandMassTilePicker(i: number, j: number): string {
    const randNum = getRandomInt(1, 13);
    const neighbourLandsCount = this.getNeighbourLandsCount(i, j);
    const maxNaighbours: { [key: number]: number } = {
      7: 1,
      8: 2,
      9: 3,
      10: 4,
      11: 5,
      12: 6,
    };
    let tile = null;
    if (randNum > 6 && neighbourLandsCount <= maxNaighbours[randNum]) {
      tile = this.getRandomValidTile();
    }
    if (tile === null) {
      tile = this.getOceanTile();
    }
    return tile;
  }

  private colourGrid(): void {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (!this.validGridPositions.has(`${i},${j}`)) {
          continue;
        }
        switch (this.algorithm) {
          case ALGORITHM_RANDOM:
            this.grid[i][j] = this.getRandomValidTile();
            break;
          case ALGORITHM_COASTAL:
            this.grid[i][j] = this.coastalTilePicker();
            break;
          case ALGORITHM_THIN_LAND_MASS:
            this.grid[i][j] = this.thinLandMassTilePicker(i, j);
            break;
          case ALGORITHM_LARGE_LAND_MASS:
            break;
          case ALGORITHM_SMALL_ISLANDS:
            break;
          case ALGORITHM_LARGE_ISLANDS:
            break;
        }
      }
    }
  }

  toString(): string {
    // Joins all arrays with a "-" delimiter and then filters empty '' before concatenating into a string.
    return this.grid
      .reduce((a, b) => [...a, "-", ...b])
      .filter((x) => x !== TILE_EDGE)
      .join("");
  }
}
