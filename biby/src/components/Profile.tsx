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
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { getUser, patchUser } from "../api/Profile";
import { Profile as ProfileInterface } from "../types";
import { Toaster } from "react-hot-toast";
import { notify } from "./common/toast";

const Profile = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    (async () => {
      const profile: ProfileInterface = await getUser("1");
      setUsername(profile.username);
      setEmail(profile.email);
    })();
  }, []);
  const saveProfile = () => {
    patchUser("1", username, email);
    notify();
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
              label="メールアドレス"
              placeholder="example@biby.live"
              value={email}
              onChange={setEmail}
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
