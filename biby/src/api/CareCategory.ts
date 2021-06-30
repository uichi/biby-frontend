import { careCategoryUrl } from "./Config";
import { CareCategory } from "../types";

export const getCareCategory = (
  id: string,
  token: string
): Promise<CareCategory> | null => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(careCategoryUrl + `${id}/`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

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

export const postCareCategory = (
  name: string,
  inputType: string,
  unit: string,
  meId: string,
  token: string
): Promise<CareCategory> | null => {
  const body = JSON.stringify({
    name,
    input_type: inputType,
    unit: unit,
    user: meId,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body,
  };
  return fetch(careCategoryUrl, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const patchCareCategory = (
  id: string,
  name: string,
  inputType: string,
  unit: string,
  meId: string,
  token: string
): Promise<CareCategory> | null => {
  const body = JSON.stringify({
    name,
    input_type: inputType,
    unit: unit,
    user: meId,
  });
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body,
  };
  return fetch(careCategoryUrl + `${id}/`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const deleteCareCategory = (
  id: string,
  token: string
): Promise<CareCategory> | null => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(careCategoryUrl + `${id}/`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};