import {
  Provider,
  defaultTheme,
  View,
  Form,
  TextField,
  ActionButton,
  Link,
} from "@adobe/react-spectrum";
import { Link as RouterLink } from "react-router-dom";
import { useState, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import {
  validateEmailError,
  validateNotEnteredError,
  notMatchPassword,
  signupError,
} from "./common/toast";
import { emailValid } from "./common/validation";
import { signupAuth } from "../api/Authentication";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { loginAuth, getMe } from "../api/Authentication";

const Signup = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(["authToken", "meId"]); // eslint-disable-line
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const isEmailValid = useMemo(() => emailValid.test(email), [email]);
  const history = useHistory();
  if (cookies.authToken && cookies.meId) history.push("/");
  const signup = async () => {
    if (!(username && email && password && passwordConfirm)) {
      validateNotEnteredError();
      return;
    }
    if (!isEmailValid) {
      validateEmailError();
      return;
    }
    if (password !== passwordConfirm) {
      notMatchPassword();
      return;
    }
    const signUpAuth = await signupAuth(
      username,
      email,
      password,
      passwordConfirm
    );
    if (signUpAuth) {
      const resultLoginAuth = await loginAuth(email, password);
      //    if (resultLoginAuth) {
      //      if (!resultLoginAuth.auth_token) {
      //        loginError();
      //        return;
      //      }
      setCookie("authToken", resultLoginAuth.auth_token, {path: '/'});
      const me = await getMe(resultLoginAuth.auth_token);
      setCookie("meId", me.id, {path: '/'});
      history.push("/");
    }
    signupError();
  };
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <Toaster position="top-center" />
      <View backgroundColor="gray-200" gridArea="content" height="100vh">
        <View marginStart="size-100" marginEnd="size-100" paddingTop="size-400">
          <h3 id="label-3">bibyへサインアップ</h3>
          <Form aria-labelledby="label-3" necessityIndicator="icon">
            <TextField
              type="string"
              inputMode="text"
              label="ユーザー名"
              placeholder="アニマル一郎"
              value={username}
              isRequired={true}
              onChange={setUsername}
            />
            <TextField
              type="email"
              inputMode="email"
              label="メールアドレス"
              placeholder="example@biby.live"
              value={email}
              isRequired={true}
              onChange={setEmail}
            />
            <TextField
              type="password"
              inputMode="text"
              label="パスワード"
              placeholder=""
              value={password}
              isRequired={true}
              onChange={setPassword}
            />
            <TextField
              type="password"
              inputMode="text"
              label="パスワード(確認)"
              placeholder=""
              value={passwordConfirm}
              isRequired={true}
              onChange={setPasswordConfirm}
            />
            <ActionButton staticColor="white" onPress={signup}>
              サインアップ
            </ActionButton>
            <Link variant="secondary" isQuiet>
              <RouterLink to="/login">
                <ActionButton staticColor="white" width="100%">
                  アカウントをお持ちの方
                </ActionButton>
              </RouterLink>
            </Link>
          </Form>
        </View>
      </View>
    </Provider>
  );
};

export default Signup;
