import { Provider, defaultTheme, Grid, View } from "@adobe/react-spectrum";
import Home from "@spectrum-icons/workflow/Home";
import Settings from "@spectrum-icons/workflow/Settings";
import AssetsModified from "@spectrum-icons/workflow/AssetsModified";
import { Link } from "@adobe/react-spectrum";
import { Link as RouterLink } from "react-router-dom";

const Footer = (): JSX.Element => {
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <View
        backgroundColor="gray-400"
        position="fixed"
        bottom="size-0"
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
            <Link variant="secondary">
              <RouterLink to="/">
                <Home size="S" />
              </RouterLink>
            </Link>
          </View>
          <View
            alignSelf="center"
            justifySelf="center"
            gridArea="name"
            marginTop="size-200"
          >
            <Link variant="secondary">
              <RouterLink to="/records">
                <AssetsModified size="S" />
              </RouterLink>
            </Link>
          </View>
          <View
            alignSelf="center"
            justifySelf="right"
            gridArea="add"
            marginTop="size-200"
            marginEnd="size-200"
          >
            <Link variant="secondary">
              <RouterLink to="/settings">
                <Settings size="S" />
              </RouterLink>
            </Link>
          </View>
        </Grid>
      </View>
    </Provider>
  );
};

export default Footer;
