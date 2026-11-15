"use server";

import {
  ErrorsResponseSchema,
  SuccessSchema,
  TokenSchema,
} from "@/src/schemas";
import { success } from "zod";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function confirmAccount(
  token: string,
  prevState: ActionStateType,
) {
  const confirmToken = TokenSchema.safeParse(token);
  if (!confirmToken.success) {
    return {
      errors: confirmToken.error.issues.map((issue) => issue.message),
      success: "",
    };
  }
  // confirmar el usuario Peticion
  const url = `${process.env.API_URL}/auth/confirm-account`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: confirmToken.data,
    }),
  });
  const json = await req.json();

  //revision de Peticion
  if (!req.ok) {
    const { error } = ErrorsResponseSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }
  const success = SuccessSchema.parse(json);
  return {
    errors: [],
    success,
  };
}
