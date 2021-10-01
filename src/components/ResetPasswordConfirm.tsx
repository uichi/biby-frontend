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
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  validateNotEnteredError,
  notMatchPassword,
  notifyErrorSending,
  notifySuccessSavePassword,
} from "./common/toast";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import { resetPasswordConfirm } from "../api/Authentication";

const ResetPasswordConfirm = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(["authToken", "meId"]); // eslint-disable-line
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  if (cookies.authToken && cookies.meId) return <Redirect to="/" />;
  const register = async () => {
    const searchParams = new URLSearchParams(location.search);
    if (!(password && passwordConfirm)) {
      validateNotEnteredError();
      return;
    }
    if (password !== passwordConfirm) {
      notMatchPassword();
      return;
    }
    const resultResetPasswordConfirm = await resetPasswordConfirm(
      searchParams.get("uid"),
      searchParams.get("token"),
      password
    );
    if (!resultResetPasswordConfirm) {
      notifyErrorSending();
      return;
    }
    if (resultResetPasswordConfirm.ok) {
      notifySuccessSavePassword();
      return;
    }
    notifyErrorSending();
  };
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <Toaster position="top-center" />
      <View backgroundColor="gray-200" gridArea="content" height="100vh">
        <View marginStart="size-100" marginEnd="size-100" paddingTop="size-400">
          <h3 id="label-3">biby diaryパスワードリセット</h3>
          <Form aria-labelledby="label-3" necessityIndicator="icon">
            <TextField
              type="password"
              inputMode="text"
              label="パスワード"
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
            <ActionButton staticColor="white" onPress={register}>
              送信
            </ActionButton>
            <Link variant="secondary" isQuiet>
              <RouterLink to="/login">
                <ActionButton staticColor="white" width="100%">
                  ログイン画面
                </ActionButton>
              </RouterLink>
            </Link>
          </Form>
        </View>
      </View>
    </Provider>
  );
};

export default ResetPasswordConfirm;
