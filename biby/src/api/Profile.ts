import { usersUrl } from "./Config";
import { Profile } from "../types";

export const getUser = (id: string): Promise<Profile> => {
  return fetch(usersUrl + `${id}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch(() => {
      return { username: "", email: "" };
    });
};

export const patchUser = (
  id: string,
  username: string,
  email: string
): void => {
  const body = JSON.stringify({ username, email });
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };
  fetch(usersUrl + `${id}/`, options);
};
