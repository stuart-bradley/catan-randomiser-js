"use client";

import { HexGrid, Layout, Hexagon } from "react-hexgrid";
import { getCubeCoords } from "@/lib/utils";
import React from "react";
import { useParams } from "next/navigation";

const BoardGrid: React.FC = () => {
  const params = useParams<{ board: string }>();
  const hexagons = getCubeCoords(params.board);

  return (
    <HexGrid className="max-w-fit mx-auto">
      <Layout flat={false} spacing={1.02}>
        {hexagons.map(({ hex, style }, i) => (
          <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} style={style} />
        ))}
      </Layout>
    </HexGrid>
  );
};

export default BoardGrid;
