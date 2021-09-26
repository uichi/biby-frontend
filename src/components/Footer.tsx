import { Provider, defaultTheme, Grid, View } from "@adobe/react-spectrum";
import Home from "@spectrum-icons/workflow/Home";
import Article from "@spectrum-icons/workflow/Article";
import TaskList from "@spectrum-icons/workflow/TaskList";
import ClassicGridView from "@spectrum-icons/workflow/ClassicGridView";
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
        zIndex={1}
      >
        <Grid
          areas={["setting article record add"]}
          columns={["1fr", "1fr", "1fr", "1fr"]}
        >
          <View
            alignSelf="center"
            justifySelf="left"
            gridArea="setting"
            paddingTop="size-150"
            marginStart="size-200"
          >
            <Link variant="secondary">
              <RouterLink to="/dashboard/top">
                <View>
                  <Home size="S" />
                </View>
              </RouterLink>
            </Link>
          </View>
          <View
            alignSelf="center"
            justifySelf="center"
            gridArea="article"
            paddingTop="size-150"
          >
            <Link variant="secondary">
              <RouterLink to="/blogs">
                <View>
                  <Article size="S" />
                </View>
              </RouterLink>
            </Link>
          </View>
          <View
            alignSelf="center"
            justifySelf="center"
            gridArea="record"
            paddingTop="size-150"
          >
            <Link variant="secondary">
              <RouterLink to="/care/logs">
                <View>
                  <TaskList size="S" />
                </View>
              </RouterLink>
            </Link>
          </View>
          <View
            alignSelf="center"
            justifySelf="right"
            gridArea="add"
            paddingTop="size-150"
            marginEnd="size-200"
          >
            <Link variant="secondary">
              <RouterLink to="/care/categories">
                <View>
                  <ClassicGridView size="S" />
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
