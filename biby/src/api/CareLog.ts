import { careLogUrl } from "./Config";
import { Pet } from "../types";

export const postCareLog = (
  care_category: string,
  date_time: string | null,
  text: string | null,
  integer: number | null,
  float: number | null,
  memo: string | null,
  token: string
): Promise<any> | null => {
  const body = JSON.stringify({
    care_category,
    date_time,
    text,
    integer,
    memo,
    float,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body,
  };
  return fetch(careLogUrl, options)
    .then((res) => {
      //       if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};
