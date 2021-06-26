import {
  Provider,
  defaultTheme,
  View,
  Form,
  TextField,
  ActionButton,
} from "@adobe/react-spectrum";
import { useState, useMemo } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import { validateNotEnteredError, validateEmailError } from "./common/toast";
import { emailValid } from "./common/validation";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isEmailValid = useMemo(() => emailValid.test(email), [email]);
  const login = async () => {
    if (!(email && password)) {
      validateNotEnteredError();
      return;
    }
    if (!isEmailValid) {
      validateEmailError();
      return;
    }
  };
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <Toaster position="top-center" />
      <Header />
      <View
        backgroundColor="gray-200"
        gridArea="content"
        minHeight="84vh"
        paddingTop="8vh"
        paddingBottom="8vh"
      >
        <View margin="size-100">
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
      <Footer />
    </Provider>
  );
};

export default Login;
