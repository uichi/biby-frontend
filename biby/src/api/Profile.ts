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
