// TODO: 環境変数から取得するようにする
const backendHost = "https://biby.live/";
// const backendHost = "https://a26940706ab6.ngrok.io/";
const apiUrl = backendHost + "api/v1/";
const authUrl = backendHost + "api/v1/auth/";
export const meUrl = authUrl + "users/me";
export const usersUrl = apiUrl + "users/";
export const loginUrl = authUrl + "token/login/";
export const logoutUrl = authUrl + "token/logout/";
export const signupUrl = usersUrl + "register";
export const petsUrl = apiUrl + "pets/";
export const petOwnerGroupUrl = apiUrl + "pet_owner_group/";
export const careCategoryUrl = apiUrl + "care_category/";
export const careLogUrl = apiUrl + "pet_care_log/";
