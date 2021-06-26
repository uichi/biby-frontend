import { loginUrl } from "./Config";
import { AuthToken } from "../types";

export const loginAuth = (
  email: string,
  password: string
): Promise<AuthToken> => {
  const body = JSON.stringify({ email, password });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };
  return fetch(loginUrl, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch(() => null);
};
