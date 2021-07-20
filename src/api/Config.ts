// TODO: 環境変数から取得するようにする
// const backendHost = "https://biby.live/";
// const backendHost = "https://e9e9cf960a9d.ngrok.io/";
const backendHost = "http://localhost:8000/";
const apiUrl = backendHost + "api/v1/";
const authUrl = backendHost + "api/v1/auth/";
export const meUrl = authUrl + "users/me/";
export const usersUrl = apiUrl + "users/";
export const loginUrl = authUrl + "token/login/";
export const logoutUrl = authUrl + "token/logout/";
export const resetPasswordUrl = authUrl + "users/reset_password/";
export const resetPasswordConfirmUrl =
  authUrl + "users/reset_password_confirm/";
export const signupUrl = usersUrl + "register";
export const petsUrl = apiUrl + "pets/";
export const petOwnerGroupUrl = apiUrl + "pet_owner_group/";
export const careCategoryUrl = apiUrl + "care_category/";
export const careLogUrl = apiUrl + "pet_care_log/";
