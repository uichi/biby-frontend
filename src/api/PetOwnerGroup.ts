import { petOwnerGroupUrl } from "./Config";

export const postPetOwnerGroup = (
  meId: string,
  petId: string,
  token: string
): Promise<any> => {
  const body = JSON.stringify({
    user_pk: meId,
    pet_pk: petId,
  });
  console.log(body);
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
