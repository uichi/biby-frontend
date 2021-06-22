import {
  Provider,
  defaultTheme,
  Grid,
  View,
  Text,
} from "@adobe/react-spectrum";
import Settings from "@spectrum-icons/workflow/Settings";
import { Link } from "@adobe/react-spectrum";
import { Link as RouterLink } from "react-router-dom";

const Header = (): JSX.Element => {
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <View
        backgroundColor="gray-400"
        position="fixed"
        top="size-0"
        width="100vw"
        height="8vh"
      >
        <Grid areas={["setting name add"]} columns={["1fr", "1fr", "1fr"]}>
          <View
            alignSelf="center"
            justifySelf="left"
            gridArea="setting"
            marginTop="size-200"
            marginStart="size-200"
          >
            <Settings size="S" color="#fff" />
          </View>
          <View
            alignSelf="center"
            justifySelf="center"
            gridArea="name"
            marginTop="size-100"
          >
            <Text>ぽち</Text>
          </View>
          <View
            alignSelf="center"
            justifySelf="right"
            gridArea="add"
            marginTop="size-100"
            marginEnd="size-100"
          >
            <Link variant="secondary" isQuiet>
              <RouterLink to="/pet">ペット一覧</RouterLink>
            </Link>
          </View>
        </Grid>
      </View>
    </Provider>
  );
};

export default Header;
