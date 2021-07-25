import { petOwnerGroupUrl } from "./Config";

export const getPetOwnerGroup = (
  meId: string,
  petId: string,
  token: string
): Promise<any> => {
  const query_params = new URLSearchParams({
    user: meId,
    pet: petId,
  });
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(petOwnerGroupUrl + `?${query_params}`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json.results[0])
    .catch(() => null);
};

export const postPetOwnerGroup = (
  meId: string,
  petId: string,
  token: string
): Promise<any> | null => {
  const body = JSON.stringify({
    user_pk: meId,
    pet_pk: petId,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body,
  };
  return fetch(petOwnerGroupUrl, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json.results)
    .catch(() => null);
};
