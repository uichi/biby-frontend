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
  validateNotEnteredError,
  validateEmailError,
  notifySendResetPasswordConfirm,
} from "./common/toast";
import { Redirect } from "react-router-dom";
import { emailValid } from "./common/validation";
import { useCookies } from "react-cookie";
import { resetPassword } from "../api/Authentication";

const ResetPassword = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(["authToken", "meId"]); // eslint-disable-line
  const [email, setEmail] = useState<string>("");
  const isEmailValid = useMemo(() => emailValid.test(email), [email]);
  if (cookies.authToken && cookies.meId) return <Redirect to="/" />;
  const login = async () => {
    if (!email) {
      validateNotEnteredError();
      return;
    }
    if (!isEmailValid) {
      validateEmailError();
      return;
    }
    await resetPassword(email);
    notifySendResetPasswordConfirm();
  };
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <Toaster position="top-center" />
      <View backgroundColor="gray-200" gridArea="content" height="100vh">
        <View marginStart="size-100" marginEnd="size-100" paddingTop="size-400">
          <h3 id="label-3">biby diaryパスワードリセット</h3>
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
            <ActionButton staticColor="white" onPress={login}>
              送信
            </ActionButton>
            <Link variant="secondary" isQuiet>
              <RouterLink to="/login">
                <ActionButton staticColor="white" width="100%">
                  ログイン画面へ戻る
                </ActionButton>
              </RouterLink>
            </Link>
          </Form>
        </View>
      </View>
    </Provider>
  );
};

export default ResetPassword;
