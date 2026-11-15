"use client";
import { useState } from "react";
import ValidateTokenForm from "./ValidateTokenForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function PasswordResetHandler() {
  const [isValidToken, setValidToken] = useState(false);
  const [token, setToken] = useState("");
  return (
    <>
      {!isValidToken ? (
        <ValidateTokenForm
          setIsValidToken={setValidToken}
          token={token}
          setToken={setToken}
        />
      ) : (
        <ResetPasswordForm token={token} />
      )}
    </>
  );
}
