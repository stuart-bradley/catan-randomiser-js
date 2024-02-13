"use server";

import { redirect } from "next/navigation";

export async function generateBoard(formData: FormData) {
  const serializedBoard = "RST-WBSB-WTDTR-WRWS-BOG";
  redirect(`/${serializedBoard}`);
}
