// TODO: 環境変数から取得するようにする
const backendHost = "http://127.0.0.1:8000/";
const apiUrl = backendHost + "api/v1/";
const usersUrl = apiUrl + "users/";
const loginUrl = backendHost + "api/auth/token/login/";

export { usersUrl, loginUrl };
