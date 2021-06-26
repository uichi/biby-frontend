import { loginUrl, logoutUrl, meUrl } from "./Config";
import { AuthToken, Me } from "../types";

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

export const logoutAuth = (token: string): Promise<null> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(logoutUrl, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch(() => null);
};

export const getMe = (token: string): Promise<Me> => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(meUrl, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch(() => null);
};
