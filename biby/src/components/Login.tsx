import {
  Provider,
  defaultTheme,
  View,
  Form,
  TextField,
  ActionButton,
} from "@adobe/react-spectrum";
import { useState, useEffect, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import {
  validateNotEnteredError,
  validateEmailError,
  loginError,
} from "./common/toast";
import { useHistory } from "react-router-dom";
import { emailValid } from "./common/validation";
import { useCookies } from "react-cookie";
import { loginAuth, getMe } from "../api/Authentication";

const Login = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(["authToken"]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isEmailValid = useMemo(() => emailValid.test(email), [email]);
  const history = useHistory();
  if (cookies.authToken) history.push("/");
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
      setCookie("authToken", resultLoginAuth.auth_token);
      const me = await getMe(resultLoginAuth.auth_token);
      setCookie("meId", me.id);
      history.push("/");
    }
    loginError();
  };
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <Toaster position="top-center" />
      <View backgroundColor="gray-200" gridArea="content" height="100vh">
        <View marginStart="size-100" marginEnd="size-100" paddingTop="size-400">
          <h3 id="label-3">bibyにログインする</h3>
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
          </Form>
        </View>
      </View>
    </Provider>
  );
};

export default Login;
