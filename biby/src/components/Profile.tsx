import {
  Provider,
  defaultTheme,
  View,
  Form,
  TextField,
  DialogTrigger,
  ActionButton,
  AlertDialog,
} from "@adobe/react-spectrum";
import { useState, useEffect, useMemo } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { getUser, patchUser } from "../api/Profile";
import { Profile as ProfileInterface } from "../types";
import { Toaster } from "react-hot-toast";
import {
  notifySuccessSave,
  notifyErrorSave,
  notifyErrorGet,
  validateNotEnteredError,
  validateEmailError,
} from "./common/toast";
import { emailValid } from "./common/validation";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { getMe } from "../api/Authentication";

const Profile = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const isEmailValid = useMemo(() => emailValid.test(email), [email]);
  const history = useHistory();
  if (!cookies.authToken) history.push("/login");
  useEffect(() => {
    (async () => {
      const me = await getMe(cookies.authToken);
      const profile: ProfileInterface | null = await getUser(
        me.id,
        cookies.authToken
      );
      if (profile) {
        setUsername(profile.username);
        setEmail(profile.email);
        return;
      }
      notifyErrorGet();
    })();
  }, []);
  const saveProfile = async () => {
    if (!(username && email)) {
      validateNotEnteredError();
      return;
    }
    if (!isEmailValid) {
      validateEmailError();
      return;
    }
    const patchedUser = await patchUser(
      cookies.meId,
      username,
      email,
      cookies.authToken
    );
    if (patchedUser) {
      notifySuccessSave();
      return;
    }
    notifyErrorSave();
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
              type="string"
              inputMode="text"
              label="ユーザー名"
              placeholder="アニマル一郎"
              value={username}
              isRequired={true}
              onChange={setUsername}
              validationState={username !== "" ? "valid" : "invalid"}
            />
            <TextField
              type="email"
              inputMode="email"
              label="メールアドレス"
              placeholder="example@biby.live"
              value={email}
              isRequired={true}
              onChange={setEmail}
              validationState={isEmailValid ? "valid" : "invalid"}
            />
            <ActionButton staticColor="white" onPress={saveProfile}>
              保存
            </ActionButton>
            <DialogTrigger>
              <ActionButton>退会</ActionButton>
              <AlertDialog
                variant="destructive"
                title="退会しますか？"
                primaryActionLabel="退会"
                cancelLabel="キャンセル"
              >
                これまで記録したデータの復元はできません。
              </AlertDialog>
            </DialogTrigger>
          </Form>
        </View>
      </View>
      <Footer />
    </Provider>
  );
};

export default Profile;
