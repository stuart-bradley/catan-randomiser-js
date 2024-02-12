import * as React from "react";
import BoardForm from "@/app/components/ui/BoardForm";
import BoardGrid from "@/app/components/ui/BoardGrid";

export default function MainCard() {
  return (
    <div>
      <BoardGrid />
      <BoardForm />
    </div>
  );
}
