import {
  Provider,
  defaultTheme,
  View,
  Text,
  Flex,
  Divider,
} from "@adobe/react-spectrum";
import User from "@spectrum-icons/workflow/User";
import Email from "@spectrum-icons/workflow/Email";
import EditIn from "@spectrum-icons/workflow/EditIn";
import UserLock from "@spectrum-icons/workflow/UserLock";
import LinkOut from "@spectrum-icons/workflow/LinkOut";
import Star from "@spectrum-icons/workflow/Star";
import Book from "@spectrum-icons/workflow/Book";
import Search from "@spectrum-icons/workflow/Search";
import Homepage from "@spectrum-icons/workflow/Homepage";
import ThumbUpOutline from "@spectrum-icons/workflow/ThumbUpOutline";
import { Link } from "@adobe/react-spectrum";
import { Link as RouterLink, Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useCookies } from "react-cookie";
import scrollToTop from "./common/scrollToTop";

const SettingApp = (): JSX.Element => {
  const [cookies, setCookie, removeCookie] = useCookies(); // eslint-disable-line
  if (!cookies.authToken) return <Redirect to="/login" />;
  scrollToTop();
  const logout = async () => {
    removeCookie("authToken", { path: "/" });
    removeCookie("meId", { path: "/" });
    removeCookie("selectedPet", { path: "/" });
    return <Redirect to="/login" />;
  };
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <Header />
      <View
        backgroundColor="gray-200"
        gridArea="content"
        minHeight="100vh"
        paddingTop="8vh"
        paddingBottom="8vh"
      >
        <Flex direction="column" gap="size-125" margin="size-100">
          <Text>アカウント</Text>
          <Divider size="M" />
          <View>
            <Link variant="secondary" isQuiet>
              <RouterLink to="/plan">
                <Star size="XS" marginEnd="size-100" />
                <Text>プレミアムプラン</Text>
              </RouterLink>
            </Link>
          </View>
          <View>
            <Link variant="secondary" isQuiet>
              <RouterLink to="/profile">
                <User size="XS" marginEnd="size-100" />
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
          <Text marginTop="size-200">biby</Text>
          <Divider size="M" />
          <View>
            <Homepage size="XS" marginEnd="size-100" />
            <Link variant="secondary" isQuiet>
              <a href="/">bibyトップ</a>
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
          <Text marginTop="size-200">biby検索</Text>
          <Divider size="M" />
          <View>
            <Search size="XS" marginEnd="size-100" />
            <Link variant="secondary" isQuiet>
              <a href="https://biby.live/" target="_blank" rel="noreferrer">
                ホスピタル
              </a>
            </Link>
          </View>
          <View>
            <Book size="XS" marginEnd="size-100" />
            <Link variant="secondary" isQuiet>
              <a
                href="https://biby.live/red_list/"
                target="_blank"
                rel="noreferrer"
              >
                レッドリスト(日本)
              </a>
            </Link>
          </View>
          <Text marginTop="size-200">その他</Text>
          <Divider size="M" />
          <View>
            <EditIn size="XS" marginEnd="size-100" />
            <Link variant="secondary" isQuiet>
              <a
                href="https://uichi.notion.site/biby-a811eb02fe254ce89eeb705c38d839a2"
                target="_blank"
                rel="noreferrer"
              >
                利用規約
              </a>
            </Link>
          </View>
          <View>
            <UserLock size="XS" marginEnd="size-100" />
            <Link variant="secondary" isQuiet>
              <a
                href="https://uichi.notion.site/09e338bb8de041e1836177042f669555"
                target="_blank"
                rel="noreferrer"
              >
                プライバシーポリシー
              </a>
            </Link>
          </View>
          {/*<View>
            <Question size="XS" marginEnd="size-100" />
            <Text>よくある質問</Text>
          </View> */}
          <View>
            <ThumbUpOutline size="XS" marginEnd="size-100" />
            <Link variant="secondary" isQuiet>
              <a
                href="https://www.buymeacoffee.com/uichi"
                target="_blank"
                rel="noreferrer"
              >
                bibyを応援する
              </a>
            </Link>
          </View>
          <Text>アプリバージョン 1.0.0</Text>
        </Flex>
      </View>
      <Footer />
    </Provider>
  );
};

export default SettingApp;
