import { usersUrl } from "./Config";
import { Profile } from "../types";

export const getUser = (id: string, token: string): Promise<Profile> | null => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(usersUrl + `${id}`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch(() => null);
};

export const patchUser = (
  id: string,
  username: string,
  email: string,
  token: string
): Promise<Profile> | null => {
  const body = JSON.stringify({ username, email });
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body,
  };
  return fetch(usersUrl + `${id}/`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch(() => null);
};
