import {
  Provider,
  defaultTheme,
  View,
  Text,
  ActionButton,
  Link,
} from "@adobe/react-spectrum";
import Header from "./Header";
import Footer from "./Footer";
import { Link as RouterLink } from "react-router-dom";

const CareLogs = (): JSX.Element => {
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
          記録一覧
        </Text>
        <View
          alignSelf="center"
          backgroundColor="gray-400"
          borderRadius="small"
          padding="size-100"
          margin="size-100"
          height="size-800"
        >
          <View marginBottom="size-100">
            <Text>散歩</Text>
          </View>
          <View>
            <Text>2021年7月1日 12:00:00</Text>
          </View>
          <View>
            <Text>30分</Text>
          </View>
        </View>
        <View
          alignSelf="center"
          backgroundColor="gray-400"
          borderRadius="small"
          padding="size-100"
          margin="size-100"
          height="size-800"
        >
          <View marginBottom="size-100">
            <Text>散歩</Text>
          </View>
          <View>
            <Text>2021年7月1日 12:00:00</Text>
          </View>
          <View>
            <Text>30分</Text>
          </View>
        </View>
        <View>
          <Link variant="secondary" margin="size-100" isQuiet>
            <RouterLink to="/care/log/edit/1">
              <ActionButton bottom="size-0">
                <Text>記録する</Text>
              </ActionButton>
            </RouterLink>
          </Link>
        </View>
      </View>
      <Footer />
    </Provider>
  );
};

export default CareLogs;
