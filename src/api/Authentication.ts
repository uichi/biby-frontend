import {
  loginUrl,
  logoutUrl,
  meUrl,
  signupUrl,
  resetPasswordUrl,
  resetPasswordConfirmUrl,
} from "./Config";
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
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
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
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const signupAuth = (
  username: string,
  email: string,
  password: string,
  password_confirm: string
): Promise<any> => {
  const body = JSON.stringify({ username, email, password, password_confirm });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };
  return fetch(signupUrl, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const resetPassword = (email: string): Promise<any> => {
  const body = JSON.stringify({ email });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };
  return fetch(resetPasswordUrl, options);
};

export const resetPasswordConfirm = (
  uid: string | null,
  token: string | null,
  new_password: string
): Promise<any> => {
  const body = JSON.stringify({ uid, token, new_password });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };
  return fetch(resetPasswordConfirmUrl, options)
    .then((res) => {
      return res;
    })
    .catch(() => null);
};
