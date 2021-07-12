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
                src={"https://placehold.jp/100x100.png"}
                //                src={result.pet.image}
                alt={result.pet.name}
                objectFit="cover"
              />
              <Flex direction="column" marginStart="size-100">
                <Text>{result.pet.name}</Text>
                <Text>{result.pet.birthday}</Text>
                <Text>{result.pet.welcome_day}</Text>
              </Flex>
            </Flex>
            <Link variant="secondary" isQuiet>
              <RouterLink to={"/pet/edit/" + result.pet.id}>
                <ActionButton width="100%">
                  <Text>編集</Text>
                </ActionButton>
              </RouterLink>
            </Link>
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
