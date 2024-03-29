import { petsUrl, petOwnerGroupUrl } from "./Config";
import { Pet } from "../types";

export const getPet = (petId: string, token: string): Promise<Pet> | null => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(petsUrl + `${petId}/`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const getPets = (
  meId: string,
  token: string
): Promise<{ pet: Pet }[]> | [] => {
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
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => []);
};

export const postPet = (
  name: string,
  gender: string,
  birthday: string,
  welcome_day: string,
  image: File | undefined,
  donateLink: string,
  token: string
): Promise<any> | null => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("gender", gender);
  formData.append("birthday", birthday);
  formData.append("welcome_day", welcome_day);
  if (donateLink.length) formData.append("donate_link", donateLink);
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

export const patchPet = (
  petId: string,
  name: string,
  gender: string,
  birthday: string,
  welcome_day: string,
  image: File | undefined,
  donateLink: string,
  token: string
): Promise<any> | null => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("gender", gender);
  formData.append("birthday", birthday ? birthday : "");
  formData.append("welcome_day", welcome_day ? welcome_day : "");
  if (image) formData.append("image", image);
  if (donateLink.length) formData.append("donate_link", donateLink);
  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  };
  return fetch(petsUrl + `${petId}/`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const deletePet = (
  petId: string,
  token: string
): Promise<Pet> | null => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(petsUrl + `${petId}/`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const getPetRelatedShareId = (
  shareId: string,
  token: string
): Promise<Pet> | null => {
  const query_params = new URLSearchParams({
    share_id: shareId,
  });
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return (
    fetch(petsUrl + `?${query_params}`, options)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      // NOTE: ペットが配列形式で返ってくるが一匹しか含まれないのでインデックス指定
      .then((json) => json[0])
      .catch(() => null)
  );
};
