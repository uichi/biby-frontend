import { usersUrl } from "./Config";
import { Profile } from "../types";

export const getUser = (id: string): Promise<Profile> | null => {
  return fetch(usersUrl + `${id}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch(() => null);
};

export const patchUser = (
  id: string,
  username: string,
  email: string
): Promise<Profile> | null => {
  const body = JSON.stringify({ username, email });
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };
  return fetch(usersUrl + `${id}/`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch(() => null);
};
