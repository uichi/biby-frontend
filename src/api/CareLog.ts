import { careLogUrl } from "./Config";
// import { Pet } from "../types";

export const getCareLog = (id: string, token: string): Promise<any> | null => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(careLogUrl + `${id}/`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const postCareLog = (
  care_category_pk: string,
  date_time: string | null,
  text: string | null,
  integer: number | null,
  float: number | null,
  memo: string | null,
  user_pk: string | null,
  pet_pk: string,
  token: string
): Promise<any> | null => {
  const body = JSON.stringify({
    care_category_pk,
    date_time,
    text,
    integer,
    memo,
    user_pk,
    pet_pk,
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
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const getCareLogs = (
  meId: string,
  petId: string,
  dateTime: string,
  token: string
): Promise<any[]> | [] => {
  if (!petId) return [];
  const query_params = new URLSearchParams({
    user: meId,
    pet: petId,
    date_time: dateTime,
  });
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(careLogUrl + `?${query_params}`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => []);
};

export const patchCareLog = (
  id: string,
  care_category_pk: string,
  date_time: string | null,
  text: string | null,
  integer: number | null,
  float: number | null,
  memo: string | null,
  user_pk: string | null,
  pet_pk: string,
  token: string
): Promise<any> | null => {
  const body = JSON.stringify({
    care_category_pk,
    date_time,
    text,
    integer,
    memo,
    user_pk,
    float,
    pet_pk,
  });
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body,
  };
  return fetch(careLogUrl + `${id}/`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const deleteCareLog = (
  id: string,
  token: string
): Promise<any> | null => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(careLogUrl + `${id}/`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};
