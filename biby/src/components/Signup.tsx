import {
  Provider,
  defaultTheme,
  View,
  Form,
  TextField,
  ActionButton,
} from "@adobe/react-spectrum";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import { notifyErrorGet, validateNotEnteredError } from "./common/toast";

const Signup = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
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
      notifyErrorGet();
    })();
  }, []);
  const saveProfile = async () => {
    if (!username && email) {
      validateNotEnteredError();
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
          <h3 id="label-3">プロフィール</h3>
          <Form aria-labelledby="label-3" necessityIndicator="icon">
            <TextField
              label="ユーザー名"
              placeholder="アニマル一郎"
              value={username}
              isRequired={true}
              onChange={setUsername}
            />
            <TextField
              type="password"
              label="メールアドレス"
              placeholder="example@biby.live"
              value={email}
              isRequired={true}
              onChange={setEmail}
            />
            <TextField
              type="password"
              label="パスワード"
              placeholder="example@biby.live"
              value={email}
              isRequired={true}
              onChange={setEmail}
            />
            <TextField
              type="password"
              label="パスワード(確認)"
              placeholder="example@biby.live"
              value={email}
              isRequired={true}
              onChange={setEmail}
            />
            <ActionButton staticColor="white" onPress={saveProfile}>
              登録
            </ActionButton>
          </Form>
        </View>
      </View>
      <Footer />
    </Provider>
  );
};

export default Signup;
