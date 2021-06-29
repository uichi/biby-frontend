import { petsUrl, petOwnerGroupUrl } from "./Config";

// TODO: Pet型をつくる
export const getPets = (meId: string, token: string): Promise<any> | null => {
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
  return fetch(petOwnerGroupUrl + `?${query_params}`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch(() => null);
};

export const postPet = (
  name: string,
  gender: string,
  birthday: string,
  welcome_day: string,
  image: File | undefined,
  token: string
): Promise<any> | null => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("gender", gender);
  formData.append("birthday", birthday);
  formData.append("welcome_day", welcome_day);
  if (image) formData.append("image", image);
  const options = {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  };
  return fetch(petsUrl, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};
