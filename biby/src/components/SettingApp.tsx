import {
  Provider,
  defaultTheme,
  View,
  Text,
  Flex,
  Divider,
} from "@adobe/react-spectrum";
import RealTimeCustomerProfile from "@spectrum-icons/workflow/RealTimeCustomerProfile";
import Email from "@spectrum-icons/workflow/Email";
import EditIn from "@spectrum-icons/workflow/EditIn";
import UserLock from "@spectrum-icons/workflow/UserLock";
import AnnotatePen from "@spectrum-icons/workflow/AnnotatePen";
import Question from "@spectrum-icons/workflow/Question";
import { Link } from "@adobe/react-spectrum";
import { Link as RouterLink } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const SettingApp = (): JSX.Element => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();
  if (!cookies.authToken) history.push("/login");
  const logout = async () => {
    removeCookie("authToken");
    history.push("/login");
  };
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
        <Flex direction="column" gap="size-125" margin="size-100">
          <Text>アカウント</Text>
          <Divider size="M" />
          <View>
            <Link variant="secondary" isQuiet>
              <RouterLink to="/profile">
                <RealTimeCustomerProfile size="XS" marginEnd="size-100" />
                <Text>プロフィール</Text>
              </RouterLink>
            </Link>
          </View>
          <View>
            <Link onPress={logout} variant="secondary" isQuiet>
              ログアウト
            </Link>
          </View>
          <Text marginTop="size-200">フィードバック</Text>
          <Divider size="M" />
          <View>
            <Email size="XS" marginEnd="size-100" />
            <Text>お問い合わせ</Text>
          </View>
          <View>
            <AnnotatePen size="XS" marginEnd="size-100" />
            <Text>アプリの感想</Text>
          </View>

          <Text marginTop="size-200">その他</Text>
          <Divider size="M" />
          <View>
            <EditIn size="XS" marginEnd="size-100" />
            <Text>利用規約</Text>
          </View>
          <View>
            <UserLock size="XS" marginEnd="size-100" />
            <Text>プライバシーポリシー</Text>
          </View>
          <View>
            <Question size="XS" marginEnd="size-100" />
            <Text>よくある質問</Text>
          </View>
          <Text>アプリバージョン 1.0.0</Text>
        </Flex>
      </View>
      <Footer />
    </Provider>
  );
};

export default SettingApp;
