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

const Pets = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [pets, setPets] = useState<{ pet: Pet }[]>([]);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const resultGetPets = await getPets(cookies.meId, cookies.authToken);
      setPets(resultGetPets);
    })();
  }, []);
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
        {pets.map((result, index) => (
          <Well key={index} margin="size-100">
            <Flex>
              <Image
                width="150px"
                height="150px"
                src={result.pet.image}
                alt={result.pet.name}
                objectFit="cover"
              />
              <Flex direction="column" marginStart="size-100">
                <Text>{result.pet.name}</Text>
                <Text>{result.pet.birthday}</Text>
                <Text>{result.pet.welcome_day}</Text>
                <Link variant="secondary" isQuiet>
                  <RouterLink to={"/pet/edit/" + result.pet.id}>
                    <ActionButton bottom="size-0">
                      <Text>編集</Text>
                      <Edit />
                    </ActionButton>
                  </RouterLink>
                </Link>
              </Flex>
            </Flex>
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
