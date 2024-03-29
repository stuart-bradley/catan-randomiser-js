export const ALGORITHM_RANDOM = "random";
export const ALGORITHM_COASTAL = "coastal";
export const ALGORITHM_THIN_LAND_MASS = "thinLandMass";
export const ALGORITHM_LARGE_LAND_MASS = "largeLandMass";
export const ALGORITHM_SMALL_ISLANDS = "smallIslands";
export const ALGORITHM_LARGE_ISLANDS = "largeIslands";

export const ALGORITHM_ARRAY = [
  ALGORITHM_RANDOM,
  ALGORITHM_COASTAL,
  ALGORITHM_THIN_LAND_MASS,
  ALGORITHM_LARGE_LAND_MASS,
  ALGORITHM_SMALL_ISLANDS,
  ALGORITHM_LARGE_ISLANDS,
] as const;

export const ALGORITHMS_BASE = [
  {
    id: ALGORITHM_RANDOM,
    label: "Random",
  },
];

export const ALGORITHMS_SEAFARERS = [
  {
    id: ALGORITHM_RANDOM,
    label: "Random",
  },
  {
    id: ALGORITHM_COASTAL,
    label: "Coastal",
  },
  {
    id: ALGORITHM_THIN_LAND_MASS,
    label: "Thin Land Mass",
  },
  {
    id: ALGORITHM_LARGE_LAND_MASS,
    label: "Large Land Mass",
  },
  {
    id: ALGORITHM_SMALL_ISLANDS,
    label: "Small Islands",
  },
  {
    id: ALGORITHM_LARGE_ISLANDS,
    label: "Large Islands",
  },
];

export const PLAYERS_4 = "4";
export const PLAYERS_6 = "6";

export const NUM_OF_PLAYERS = [
  {
    id: PLAYERS_4,
    label: "4 Players",
  },
  {
    id: PLAYERS_6,
    label: "6 Players",
  },
] as const;

export const TILE_WHEAT = "W";
export const TILE_SHEEP = "S";
export const TILE_ROCK = "R";
export const TILE_TREE = "T";
export const TILE_BRICK = "B";
export const TILE_DESERT = "D";
export const TILE_GOLD = "G";
export const TILE_OCEAN = "O";
export const TILE_EDGE = "";

export const LAND_TILES = new Set([
  TILE_WHEAT,
  TILE_SHEEP,
  TILE_ROCK,
  TILE_TREE,
  TILE_BRICK,
  TILE_DESERT,
  TILE_GOLD,
]);

export const BOARD_COLOURS: { [key: string]: string } = {
  [TILE_WHEAT]: "#ccb804",
  [TILE_SHEEP]: "#a5c13f",
  [TILE_ROCK]: "#7f7f7f",
  [TILE_TREE]: "#3a7044",
  [TILE_BRICK]: "#c7490a",
  [TILE_DESERT]: "#fceac4",
  [TILE_GOLD]: "#ffcf00",
  [TILE_OCEAN]: "#3daace",
} as const;

// Col * Rows
export const BOARD_SIZE: { [key: string]: number[] } = {
  "base-4": [5, 5],
  "base-6": [6, 7],
  "seafarers-4": [7, 7],
  "seafarers-6": [10, 7],
} as const;

// Col * Rows
export const LAYOUT_PROPS: {
  [key: string]: {
    size: { x: number; y: number };
    origin: { x: number; y: number };
  };
} = {
  "5,5": { size: { x: 8, y: 8 }, origin: { x: 0, y: 0 } },
  "6,7": { size: { x: 7.5, y: 7.5 }, origin: { x: 5, y: 0 } },
  "7,7": { size: { x: 7.5, y: 7.5 }, origin: { x: 0, y: 0 } },
  "10,7": { size: { x: 6, y: 6 }, origin: { x: -15, y: 0 } },
} as const;

export const BASE_TILE_POOL = {
  [TILE_WHEAT]: 4,
  [TILE_SHEEP]: 4,
  [TILE_ROCK]: 3,
  [TILE_TREE]: 4,
  [TILE_BRICK]: 3,
  [TILE_DESERT]: 1,
  [TILE_GOLD]: 0,
  [TILE_OCEAN]: 0,
} as const;
export const BASE_5_6_TILE_POOL = {
  [TILE_WHEAT]: 2,
  [TILE_SHEEP]: 2,
  [TILE_ROCK]: 2,
  [TILE_TREE]: 2,
  [TILE_BRICK]: 2,
  [TILE_DESERT]: 1,
  [TILE_GOLD]: 0,
  [TILE_OCEAN]: 0,
} as const;
export const SEAFARERS_TILE_POOL = {
  [TILE_WHEAT]: 1,
  [TILE_SHEEP]: 1,
  [TILE_ROCK]: 2,
  [TILE_TREE]: 1,
  [TILE_BRICK]: 2,
  [TILE_DESERT]: 2,
  [TILE_GOLD]: 2,
  [TILE_OCEAN]: 19,
} as const;
export const SEAFARERS_5_6_TILE_POOL = {
  [TILE_WHEAT]: 0,
  [TILE_SHEEP]: 0,
  [TILE_ROCK]: 0,
  [TILE_TREE]: 0,
  [TILE_BRICK]: 0,
  [TILE_DESERT]: 1,
  [TILE_GOLD]: 2,
  [TILE_OCEAN]: 7,
} as const;
