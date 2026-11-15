"use server";

import {
  ErrorsResponseSchema,
  SuccessSchema,
  TokenSchema,
} from "@/src/schemas";
import { success } from "zod";

type ActionStateType = {
  errors: string[];
  success: "";
};
export async function validateToken(token: string, prevState: ActionStateType) {
  const resetPasswordToken = TokenSchema.safeParse(token);
  if (!resetPasswordToken.success) {
    return {
      errors: resetPasswordToken.error.issues.map((issue) => issue.message),
    };
  }
  const url = `${process.env.API_URL}/auth/validate-token`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: resetPasswordToken.data,
    }),
  });
  const json = await req.json();
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
