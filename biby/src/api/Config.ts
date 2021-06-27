// TODO: 環境変数から取得するようにする
const backendHost = "http://127.0.0.1:8000/";
const apiUrl = backendHost + "api/v1/";
const authUrl = backendHost + "api/auth/v1/";
const meUrl = authUrl + "users/me";
const usersUrl = apiUrl + "users/";
const loginUrl = authUrl + "token/login/";
const logoutUrl = authUrl + "token/logout/";
const signupUrl = usersUrl + "register";

export { usersUrl, meUrl, loginUrl, logoutUrl, signupUrl };
