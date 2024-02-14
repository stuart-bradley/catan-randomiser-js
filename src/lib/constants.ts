export const ALGORITHMS_BASE = [
  {
    id: "random",
    label: "Random",
  },
];

export const ALGORITHMS_SEAFARERS = [
  {
    id: "random",
    label: "Random",
  },
  {
    id: "coastal",
    label: "Coastal",
  },
  {
    id: "thinLandMass",
    label: "Thin Land Mass",
  },
  {
    id: "largeLandMass",
    label: "Large Land Mass",
  },
  {
    id: "largeIslands",
    label: "Large Islands",
  },
  {
    id: "smallIslands",
    label: "Small Islands",
  },
];

export const NUM_OF_PLAYERS = [
  {
    id: "4",
    label: "4 Players",
  },
  {
    id: "6",
    label: "6 Players",
  },
];

export const TILE_WHEAT = "W";
export const TILE_SHEEP = "S";
export const TILE_ROCK = "R";
export const TILE_TREE = "T";
export const TILE_BRICK = "B";
export const TILE_DESERT = "D";
export const TILE_GOLD = "G";
export const TILE_OCEAN = "O";

export const BOARD_COLOURS: { [key: string]: string } = {
  [TILE_WHEAT]: "#ccb804",
  [TILE_SHEEP]: "#a5c13f",
  [TILE_ROCK]: "#7f7f7f",
  [TILE_TREE]: "#3a7044",
  [TILE_BRICK]: "#c7490a",
  [TILE_DESERT]: "#fceac4",
  [TILE_GOLD]: "#ffcf00",
  [TILE_OCEAN]: "#3daace",
};

// Col * Rows
export const BOARD_SIZE: { [key: string]: number[] } = {
  "base-4": [5, 5],
  "base-6": [6, 7],
  "seafarers-4": [7, 7],
  "seafarers-6": [10, 7],
};

export const BASE_TILE_POOL = {
  [TILE_WHEAT]: 4,
  [TILE_SHEEP]: 4,
  [TILE_ROCK]: 3,
  [TILE_TREE]: 4,
  [TILE_BRICK]: 3,
  [TILE_DESERT]: 1,
  [TILE_GOLD]: 0,
  [TILE_OCEAN]: 0,
};
export const BASE_5_6_TILE_POOL = {
  [TILE_WHEAT]: 2,
  [TILE_SHEEP]: 2,
  [TILE_ROCK]: 2,
  [TILE_TREE]: 2,
  [TILE_BRICK]: 2,
  [TILE_DESERT]: 1,
  [TILE_GOLD]: 0,
  [TILE_OCEAN]: 0,
};
export const SEAFARERS_TILE_POOL = {
  [TILE_WHEAT]: 1,
  [TILE_SHEEP]: 1,
  [TILE_ROCK]: 2,
  [TILE_TREE]: 1,
  [TILE_BRICK]: 2,
  [TILE_DESERT]: 2,
  [TILE_GOLD]: 2,
  [TILE_OCEAN]: 19,
};
export const SEAFARERS_5_6_TILE_POOL = {
  [TILE_WHEAT]: 0,
  [TILE_SHEEP]: 0,
  [TILE_ROCK]: 0,
  [TILE_TREE]: 0,
  [TILE_BRICK]: 0,
  [TILE_DESERT]: 1,
  [TILE_GOLD]: 2,
  [TILE_OCEAN]: 7,
};
