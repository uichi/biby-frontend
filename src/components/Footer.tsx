import { Provider, defaultTheme, Grid, View } from "@adobe/react-spectrum";
import Home from "@spectrum-icons/workflow/Home";
import Feed from "@spectrum-icons/workflow/Feed";
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
                <View>
                  <Home size="S" />
                </View>
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
              <RouterLink to="/care/logs">
                <View>
                  <AssetsModified size="S" />
                </View>
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
              <RouterLink to="/care/categories">
                <View>
                  <Feed size="S" />
                </View>
              </RouterLink>
            </Link>
          </View>
        </Grid>
      </View>
    </Provider>
  );
};

export default Footer;
