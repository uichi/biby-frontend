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
        zIndex={2}
      >
        <Grid areas={["setting name add"]} columns={["1fr", "1fr", "1fr"]}>
          <View
            alignSelf="center"
            justifySelf="left"
            gridArea="setting"
            paddingTop="size-150"
            marginStart="size-200"
          >
            <Link variant="secondary" isQuiet>
              <RouterLink to="/settings">
                <View>
                  <Settings size="S" />
                </View>
              </RouterLink>
            </Link>
          </View>
          <View
            alignSelf="center"
            justifySelf="center"
            gridArea="name"
            marginTop="size-100"
            paddingTop="size-40"
          >
            <Text>biby</Text>
          </View>
          <View
            alignSelf="center"
            justifySelf="right"
            gridArea="add"
            marginTop="size-100"
            marginEnd="size-100"
            paddingTop="size-40"
          >
            <Link variant="secondary" isQuiet>
              <RouterLink to="/pets">ペット一覧</RouterLink>
            </Link>
          </View>
        </Grid>
      </View>
    </Provider>
  );
};

export default Header;
