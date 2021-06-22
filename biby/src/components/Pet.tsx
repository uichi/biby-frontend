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

const Pet = (): JSX.Element => {
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
      </View>
      <Footer />
    </Provider>
  );
};

export default Pet;
