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
    {
      serialisedBoard: "SBT-WSDD-BBTRW-BTRWTW-TBSWS-RTRS-RSW",
      expected: LAYOUT_PROPS["6,7"],
    },
    {
      serialisedBoard: "RBWR-RBGTO-WSWOBS-RSOSWGT-RSOTWT-TBODD-BDOO",
      expected: LAYOUT_PROPS["7,7"],
    },
    {
      serialisedBoard:
        "SGORSOG-GRDDWDSD-SGDSBOBRO-RWOTTSRORB-TOBSRWWBO-WOOBOOTT-WBWOOTT",
      expected: LAYOUT_PROPS["10,7"],
    },
  ])(
    "Test getLayoutProps returns the correct layout ($expected) for each serialized board (#serialisedBoard)",
    ({ serialisedBoard, expected }) => {
      const result = getLayoutProps(serialisedBoard);
      expect(result).toEqual(expected);
    },
  );
});
