import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import BoardGrid from "./BoardGrid";

vi.mock("next/navigation", () => {
  const useParams = vi
    .fn()
    .mockReturnValue({ board: "RST-WBSB-WTDTR-TRWS-BWS" });
  return { useParams };
});

describe("BoardGrid", () => {
  beforeEach(async () => {
    render(<BoardGrid />);

    return async () => {
      cleanup();
      vi.clearAllMocks();
    };
  });
  it("should render properly", () => {
    const hexgrid: HTMLOrSVGElement = screen.getByTestId("hexgrid-svg");
    // @ts-ignore
    const g: SVGElement = hexgrid.firstElementChild;
    expect(g.childElementCount).toBe(19);
  });
});
