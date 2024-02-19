import { Hex } from "react-hexgrid";
import { BOARD_COLOURS } from "./constants";

export const getCubeCoords = (
  serializedBoard: string,
): Array<{ hex: Hex; style: { fill: string } }> => {
  /*
          This function takes a seralised board like 'RST-WBSB-WTDTR-WRWS-BWS' and converts it to Hex objects with
          Cube coordinates (https://www.redblobgames.com/grids/hexagons/#coordinates-cube).

          The values are determined as follows:
          - Q starts at 0 and increments with each letter. On a new row, this decrements by 1, or stays as the gridMin.
          - R starts as the negative integer division of the total rows (e.g. -2) and increments with each row.
          - S starts at the length of the top row - 1 (e.g. 2) and decrements with each letter. When the grid halfway
            point is reached, S should decrement for each row (e.g. when R is above 0).
       */
  const rows = serializedBoard.split("-");
  const gridMax = Math.floor(rows.length / 2);
  const gridMin = -1 * gridMax;
  let qStart = 0;
  let rStart = gridMin;
  let sStart = rows[0].length - 1;

  let hexagons = [];

  for (const row of rows) {
    let q = qStart;
    let s = rStart;
    for (const hexLetter of row) {
      const hex = new Hex(q, rStart, s);
      const style = { fill: BOARD_COLOURS[hexLetter] };
      hexagons.push({ hex: hex, style: style });
      q += 1;
      s -= 1;
    }
    qStart = Math.max(qStart - 1, gridMin);
    rStart += 1;
    if (rStart > 0) {
      sStart -= 1;
    }
  }

  return hexagons;
};
