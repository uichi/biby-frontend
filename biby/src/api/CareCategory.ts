import { careCategoryUrl } from "./Config";
import { CareCategory } from "../types";

export const getCategories = (
  meId: string,
  token: string
): Promise<CareCategory[]> | [] => {
  const query_params = new URLSearchParams({
    user: meId,
  });
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(careCategoryUrl + `?${query_params}`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json.results)
    .catch(() => []);
};
