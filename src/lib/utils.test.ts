import { expect, describe, it } from "vitest";
import { getCubeCoords, getLayoutProps } from "./utils";
import { LAYOUT_PROPS } from "./constants";

describe("utils.ts", () => {
  it("Test getCubeCoords returns the right number of Hex objects", () => {
    const serialisedBoard = "RST-WBSB-WTDTR-TRWS-BWS";
    const numberOfHexagons = serialisedBoard.replaceAll("-", "").length; // 19.
    expect(getCubeCoords(serialisedBoard).length).toBe(numberOfHexagons);
  });
  it.each([
    {
      serialisedBoard: "RST-WBSB-WTDTR-TRWS-BWS",
      expected: LAYOUT_PROPS["5,5"],
    },
  ])(
    "Test getLayoutProps returns the correct layout ($expected) for each serialized board (#serialisedBoard)",
    ({ serialisedBoard, expected }) => {
      const result = getLayoutProps(serialisedBoard);
      expect(result).toEqual(expected);
    },
  );
});
