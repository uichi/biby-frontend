import {
  Provider,
  defaultTheme,
  View,
  ActionButton,
  Text,
} from "@adobe/react-spectrum";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "@adobe/react-spectrum";
import { Link as RouterLink } from "react-router-dom";

const CareCategories = (): JSX.Element => {
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <Header />
      <View
        backgroundColor="gray-200"
        gridArea="content"
        minHeight="84vh"
        paddingTop="8vh"
        paddingBottom="8vh"
        marginTop="size-100"
      >
        <Text marginStart="size-100" marginTop="size-500">
          カテゴリ一覧
        </Text>
        <View
          alignSelf="center"
          backgroundColor="gray-400"
          borderRadius="small"
          padding="size-100"
          margin="size-100"
          height="size-300"
        >
          <Link variant="secondary" isQuiet>
            <RouterLink to="/care/category/edit/1">
              <View marginBottom="size-100">
                <Text>散歩</Text>
              </View>
            </RouterLink>
          </Link>
        </View>
        <View
          alignSelf="center"
          backgroundColor="gray-400"
          borderRadius="small"
          padding="size-100"
          margin="size-100"
          height="size-300"
        >
          <Link variant="secondary" isQuiet>
            <RouterLink to="/care/category/edit/1">
              <View marginBottom="size-100">
                <Text>ごはん</Text>
              </View>
            </RouterLink>
          </Link>
        </View>
        <View>
          <Link variant="secondary" margin="size-100" isQuiet>
            <RouterLink to="/care/category/edit/1">
              <ActionButton bottom="size-0">
                <Text>追加</Text>
              </ActionButton>
            </RouterLink>
          </Link>
        </View>
      </View>
      <Footer />
    </Provider>
  );
};

export default CareCategories;
