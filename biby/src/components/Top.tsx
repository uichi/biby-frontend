import {
  Provider,
  defaultTheme,
  View,
  Text,
  Well,
  Flex,
  Image,
} from "@adobe/react-spectrum";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from 'react';
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const Top = (): JSX.Element => {
  const [cookies, setCookie] = useCookies();
  const history = useHistory();
  useEffect(() => {
    if (!cookies.authToken) history.push("/login");
  }, []);
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
        <Well margin="size-100">
          <Flex>
            <Image
              width="150px"
              height="150px"
              src="https://i.imgur.com/c3gTKSJ.jpg"
              alt=""
              objectFit="cover"
            />
            <Flex direction="column" marginStart="size-100">
              <Text>イッヌ</Text>
              <Text>誕生日</Text>
              <Text>家族になった日</Text>
            </Flex>
          </Flex>
        </Well>
        <Text marginStart="size-100" marginTop="size-500">
          毎日の日課
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

        <Text marginStart="size-100" marginTop="size-500">
          本日の記録
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
      </View>
      <Footer />
    </Provider>
  );
};

export default Top;
