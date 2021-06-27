import {
  Provider,
  defaultTheme,
  View,
  Form,
  TextField,
  ActionButton,
} from "@adobe/react-spectrum";
import { useState, useEffect, useMemo } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import {
  validateEmailError,
  notifyErrorGet,
  validateNotEnteredError,
  loginError,
} from "./common/toast";
import { emailValid } from "./common/validation";
import { loginAuth, signupAuth } from "../api/Authentication";

const Signup = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const isEmailValid = useMemo(() => emailValid.test(email), [email]);
  useEffect(() => {
    (async () => {
      //      const me = await getMe(cookies.authToken);
      //      const profile: ProfileInterface | null = await getUser(
      //        me.id,
      //        cookies.authToken
      //      );
      //      if (profile) {
      //        setUsername(profile.username);
      //        setEmail(profile.email);
      //        return;
      //      }
      //      notifyErrorGet();
    })();
  }, []);
  const signup = async () => {
    if (!(username && email && password && passwordConfirm)) {
      validateNotEnteredError();
      return;
    }
    if (!isEmailValid) {
      validateEmailError();
      return;
    }
    const signUpAuth = await signupAuth(
      username,
      email,
      password,
      passwordConfirm
    );
    console.log(signUpAuth);
    //    if (resultLoginAuth) {
    //      if (!resultLoginAuth.auth_token) {
    //        loginError();
    //        return;
    //      }
    //            history.push("/");
    //    }
    //    loginError();
  };
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <Toaster position="top-center" />
      <View backgroundColor="gray-200" gridArea="content" height="100vh">
        <View marginStart="size-100" marginEnd="size-100" paddingTop="size-400">
          <h3 id="label-3">サインアップ</h3>
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
              登録
            </ActionButton>
          </Form>
        </View>
      </View>
    </Provider>
  );
};

export default Signup;
