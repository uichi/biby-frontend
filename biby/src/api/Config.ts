// TODO: 環境変数から取得するようにする
const backendHost = "http://127.0.0.1:8000/";
const apiUrl = backendHost + "api/v1/";
const authUrl = backendHost + "api/v1/auth/";
export const meUrl = authUrl + "users/me";
export const usersUrl = apiUrl + "users/";
export const loginUrl = authUrl + "token/login/";
export const logoutUrl = authUrl + "token/logout/";
export const signupUrl = usersUrl + "register";
export const petsUrl = apiUrl + "pets/";
export const petOwnerGroupUrl = apiUrl + "pet_owner_group/";
