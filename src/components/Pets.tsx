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
  Heading,
  DialogTrigger,
  Dialog,
  Divider,
  Content,
} from "@adobe/react-spectrum";
import Header from "./Header";
import Footer from "./Footer";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { getPets } from "../api/Pet";
import { Pet } from "../types";
//import { IllustratedMessage } from "@adobe/react-spectrum";
//import NotFound from "@spectrum-icons/illustrations/NotFound";
import Loading from "./common/Loading";

const Pets = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [pets, setPets] = useState<{ pet: Pet }[]>([]);
  const history = useHistory();
  useEffect(() => {
    let cleanedUp = false;
    (async () => {
      const resultGetPets = await getPets(cookies.meId, cookies.authToken);
      if (cleanedUp) return;
      setPets(resultGetPets);
      setIsLoaded(false);
    })();
    const cleanup = () => {
      cleanedUp = true;
    };
    return cleanup;
  }, []);
  if (!cookies.authToken) history.push("/login");
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      {isLoaded && <Loading />}
      <Header />
      <View
        backgroundColor="gray-200"
        gridArea="content"
        minHeight="84vh"
        paddingTop="8vh"
        paddingBottom="8vh"
      >
        <View marginStart="size-100">
          <h3>ペット一覧</h3>
        </View>
        {pets.map((result, index) => (
          <Well key={index} margin="size-100" marginBottom="size-200">
            <Flex marginBottom="size-100">
              <Image
                width="100px"
                height="100px"
                src={result.pet.image}
                alt={result.pet.name}
                objectFit="cover"
              />
              <Flex direction="column" marginStart="size-150">
                <Heading
                  level={3}
                  margin="size-0"
                  marginTop="size-0"
                  marginBottom="size-100"
                >
                  {result.pet.name}
                </Heading>
                {(() => {
                  const date = new Date(result.pet.birthday);
                  const year = date.getFullYear();
                  const month = date.getMonth() + 1;
                  const day = date.getDate();
                  return (
                    <Text>
                      誕生日：{year}年{month}月{day}日
                    </Text>
                  );
                })()}
                {(() => {
                  const date = new Date(result.pet.welcome_day);
                  const year = date.getFullYear();
                  const month = date.getMonth() + 1;
                  const day = date.getDate();
                  return (
                    <Text>
                      出生日：{year}年{month}月{day}日
                    </Text>
                  );
                })()}
              </Flex>
            </Flex>
            <Link variant="secondary" isQuiet>
              <RouterLink to={"/pet/edit/" + result.pet.id}>
                <ActionButton marginBottom="size-50" width="100%">
                  <Text>編集</Text>
                </ActionButton>
              </RouterLink>
            </Link>
            <DialogTrigger isDismissable>
              <ActionButton width="100%">ペット共有</ActionButton>
              <Dialog>
                <Heading>ペット共有</Heading>
                <Divider />
                <Content>
                  <Text>
                    下記のIDを他のユーザーに共有することで、ペットの情報共有ができます。
                  </Text>
                  <View>
                    <Heading level={5}>{result.pet.share_id}</Heading>
                  </View>
                </Content>
              </Dialog>
            </DialogTrigger>
          </Well>
        ))}
        <View marginTop="size-100" marginBottom="size-100">
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
