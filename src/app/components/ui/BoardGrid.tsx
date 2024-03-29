"use client";

import { HexGrid, Layout, Hexagon } from "react-hexgrid";
import { getCubeCoords, getLayoutProps } from "../../../lib/utils";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ALGORITHMS_BASE, ALGORITHMS_SEAFARERS } from "@/lib/constants";

const BoardGrid: React.FC = () => {
  const params = useParams<{ board: string }>();
  const [getHexagons] = useState(getCubeCoords(params.board));
  const [getLayoutPropsState] = useState(getLayoutProps(params.board));
  const [getWindowWidth, setWindowWidth] = useState<number>();
  // Size and origin are dependent on grid size it seems.

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <HexGrid
      className="max-w-fit mx-auto"
      width={getWindowWidth}
      height="500"
      data-testid="hexgrid-svg"
    >
      <Layout
        size={getLayoutPropsState.size}
        origin={getLayoutPropsState.origin}
        flat={false}
        spacing={1.02}
      >
        {getHexagons.map(({ hex, style }, i) => (
          <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} style={style} />
        ))}
      </Layout>
    </HexGrid>
  );
};

export default BoardGrid;
