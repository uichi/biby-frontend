import {
  Provider,
  defaultTheme,
  View,
  Text,
  Well,
  Flex,
  Image,
  ActionButton,
  Link,
} from "@adobe/react-spectrum";
import Header from "./Header";
import Footer from "./Footer";
import Edit from "@spectrum-icons/workflow/Edit";
import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const Pets = (): JSX.Element => {
  const [cookies, setCookie] = useCookies();
  const history = useHistory();
  //  useEffect(() => {
  //
  //  }, []);
  if (!cookies.authToken) history.push("/login");
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
              <Link variant="secondary" isQuiet>
                <RouterLink to="/pet/edit/1">
                  <ActionButton bottom="size-0">
                    <Text>編集</Text>
                    <Edit />
                  </ActionButton>
                </RouterLink>
              </Link>
            </Flex>
          </Flex>
        </Well>
        <View>
          <Link variant="secondary" margin="size-100" isQuiet>
            <RouterLink to="/pet/add">
              <ActionButton bottom="size-0" width="calc(100% - size-200)">
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

export default Pets;
