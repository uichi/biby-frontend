import {
  Provider,
  defaultTheme,
  View,
  Form,
  TextField,
  ActionButton,
  Link,
} from "@adobe/react-spectrum";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { useState, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import {
  validateNotEnteredError,
  validateEmailError,
  loginError,
} from "./common/toast";
import { emailValid } from "./common/validation";
import { useCookies } from "react-cookie";
import { loginAuth, getMe } from "../api/Authentication";

const Login = (): JSX.Element => {
  const [cookies, setCookie] = useCookies();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isEmailValid = useMemo(() => emailValid.test(email), [email]);
  if (cookies.authToken && cookies.meId)
    return <Redirect to="/dashboard/top" />;
  const login = async () => {
    if (!(email && password)) {
      validateNotEnteredError();
      return;
    }
    if (!isEmailValid) {
      validateEmailError();
      return;
    }
    const resultLoginAuth = await loginAuth(email, password);
    if (resultLoginAuth) {
      if (!resultLoginAuth.auth_token) {
        loginError();
        return;
      }
      setCookie("authToken", resultLoginAuth.auth_token, { path: "/" });
      const me = await getMe(resultLoginAuth.auth_token);
      setCookie("meId", me.id, { path: "/" });
      return <Redirect to="/dashboard/top" />;
    }
    loginError();
  };
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <Toaster position="top-center" />
      <View backgroundColor="gray-200" gridArea="content" height="100vh">
        <View marginStart="size-100" marginEnd="size-100" paddingTop="size-400">
          <h3 id="label-3">biby diaryにログインする</h3>
          <Form aria-labelledby="label-3" necessityIndicator="icon">
            <TextField
              inputMode="email"
              label="メールアドレス"
              placeholder="example@biby.live"
              value={email}
              isRequired={true}
              onChange={setEmail}
              validationState={isEmailValid ? "valid" : "invalid"}
            />
            <TextField
              type="password"
              inputMode="text"
              label="パスワード"
              value={password}
              isRequired={true}
              onChange={setPassword}
            />
            <ActionButton staticColor="white" onPress={login}>
              ログイン
            </ActionButton>
            <Link variant="secondary" isQuiet>
              <RouterLink to="/reset_password">
                <ActionButton staticColor="white" width="100%">
                  パスワードをお忘れの方
                </ActionButton>
              </RouterLink>
            </Link>
            <Link variant="secondary">
              <RouterLink to="/signup">アカウントをお持ちでない方</RouterLink>
            </Link>
          </Form>
          <View marginTop="size-400">※本サービスはスマートフォン推奨です。PC版は今後、対応予定です。</View>
        </View>
      </View>
    </Provider>
  );
};

export default Login;
