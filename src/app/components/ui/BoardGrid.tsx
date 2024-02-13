"use client";

import { HexGrid, Layout, Hexagon } from "react-hexgrid";
import { getCubeCoords } from "@/lib/utils";
import React from "react";

const serializedBoard = "RST-WBSB-WTDTR-WRWS-BOG";

const BoardGrid: React.FC = () => {
  const hexagons = getCubeCoords(serializedBoard);

  return (
    <HexGrid className="max-w-sm mx-auto">
      <Layout flat={false} spacing={1.02}>
        {hexagons.map(({ hex, style }, i) => (
          <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} style={style} />
        ))}
      </Layout>
    </HexGrid>
  );
};

export default BoardGrid;
