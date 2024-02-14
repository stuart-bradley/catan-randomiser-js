import { expect, test } from "vitest";
import { getCubeCoords } from "./utils";

test("Test getCubeCoords returns the right number of Hexagon objects", () => {
  const serializedBoard = "RST-WBSB-WTDTR-TRWS-BWS";
  const numberOfHexagons = serializedBoard.replaceAll("-", "").length; // 19.
  expect(getCubeCoords(serializedBoard).length).toBe(numberOfHexagons);
});
