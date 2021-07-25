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
import LinkOut from "@spectrum-icons/workflow/LinkOut";
import StarOutline from "@spectrum-icons/workflow/StarOutline";
import { Link } from "@adobe/react-spectrum";
import { Link as RouterLink } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import scrollToTop from "./common/scrollToTop";

const SettingApp = (): JSX.Element => {
  const [cookies, setCookie, removeCookie] = useCookies(); // eslint-disable-line
  const history = useHistory();
  scrollToTop();
  if (!cookies.authToken) history.push("/login");
  const logout = async () => {
    removeCookie("authToken", { path: "/" });
    removeCookie("meId", { path: "/" });
    removeCookie("selectedPet", { path: "/" });
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
              <RouterLink to="/plan">
                <StarOutline size="XS" marginEnd="size-100" />
                <Text>プレミアムプラン</Text>
              </RouterLink>
            </Link>
          </View>
          <View>
            <Link variant="secondary" isQuiet>
              <RouterLink to="/profile">
                <RealTimeCustomerProfile size="XS" marginEnd="size-100" />
                <Text>プロフィール</Text>
              </RouterLink>
            </Link>
          </View>
          <View>
            <LinkOut size="XS" marginEnd="size-100" />
            <Link onPress={logout} variant="secondary" isQuiet>
              ログアウト
            </Link>
          </View>
          <Text marginTop="size-200">フィードバック</Text>
          <Divider size="M" />
          <View>
            <Email size="XS" marginEnd="size-100" />
            <Link variant="secondary" isQuiet>
              <a
                href="https://forms.gle/EJdXYLNWbeLfCccm9"
                target="_blank"
                rel="noreferrer"
              >
                お問い合わせ
              </a>
            </Link>
          </View>
          {/* <View>
            <AnnotatePen size="XS" marginEnd="size-100" />
            <Text>アプリの感想</Text>
          </View> */}

          <Text marginTop="size-200">その他</Text>
          <Divider size="M" />
          <View>
            <EditIn size="XS" marginEnd="size-100" />
            <Link variant="secondary" isQuiet>
              <a href="https://biby.live" target="_blank" rel="noreferrer">
                利用規約
              </a>
            </Link>
          </View>
          <View>
            <UserLock size="XS" marginEnd="size-100" />
            <Link variant="secondary" isQuiet>
              <a href="https://biby.live" target="_blank" rel="noreferrer">
                プライバシーポリシー
              </a>
            </Link>
          </View>
          {/*<View>
            <Question size="XS" marginEnd="size-100" />
            <Text>よくある質問</Text>
          </View> */}
          <Text>アプリバージョン 0.1.0</Text>
        </Flex>
      </View>
      <Footer />
    </Provider>
  );
};

export default SettingApp;
