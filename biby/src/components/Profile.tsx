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
import { getUser } from "../api/Profile";
import { Profile as ProfileInterface } from "../types";

const Profile = (): JSX.Element => {
  const [profile, setProfile] = useState<ProfileInterface>({
    username: "",
    email: "",
  });
  useEffect(() => {
    (async () => {
      const user: ProfileInterface = await getUser("1");
      setProfile(user);
    })();
  }, []);
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
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
              value={profile.username}
              isRequired={true}
            />
            <TextField
              label="メールアドレス"
              placeholder="example@biby.live"
              value={profile.email}
            />
            <ActionButton type="submit" staticColor="white">
              保存
            </ActionButton>
            <DialogTrigger>
              <ActionButton>削除</ActionButton>
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
