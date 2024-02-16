"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { ALGORITHM_ARRAY, PLAYERS_4, PLAYERS_6 } from "@/lib/constants";
import CatanBoardGenerator from "@/lib/CatanBoardGenerator";

const schema = z.object({
  useSeafarers: z.boolean(),
  randAlgorithm: z.enum(ALGORITHM_ARRAY),
  numOfPlayers: z.enum([PLAYERS_4, PLAYERS_6]),
});

export async function generateBoard(formData: FormData) {
  const validatedFields = schema.safeParse({
    useSeafarers: formData.has("useSeafarers"),
    randAlgorithm: formData.get("randAlgorithm"),
    numOfPlayers: formData.get("numOfPlayers"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // const serializedBoard = "RST-WBSB-WTDTR-TRWS-BWS";

  const serializedBoard = new CatanBoardGenerator(
    validatedFields.data.useSeafarers,
    validatedFields.data.numOfPlayers,
    validatedFields.data.randAlgorithm,
  ).toString();
  redirect(`/${serializedBoard}`);
}
