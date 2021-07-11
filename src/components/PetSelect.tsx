import {
  Provider,
  defaultTheme,
  View,
  Text,
  Well,
  Flex,
  Image,
  RadioGroup,
  Radio,
} from "@adobe/react-spectrum";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { getPets } from "../api/Pet";
import { Pet } from "../types";
//import { IllustratedMessage } from "@adobe/react-spectrum";
//import NotFound from "@spectrum-icons/illustrations/NotFound";
import Loading from "./common/Loading";

const PetSelect = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [pets, setPets] = useState<{ pet: Pet }[]>([]);
  const history = useHistory();
  if (!cookies.authToken) history.push("/login");
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
        <RadioGroup
          label="ペット選択"
          margin="size-100"
          defaultValue={cookies.selectedPet}
          value={cookies.selectedPet}
          onChange={(value) => {
            setCookie("selectedPet", value, { path: "/" });
          }}
          isEmphasized
        >
          {pets.map((result, index) => (
            <Well marginBottom="size-100" key={index}>
              <Radio value={result.pet.id.toString()} width="100%">
                <Flex>
                  {/* <Image
                    width="60px"
                    height="60px"
                    src={"https://placehold.jp/100x100.png"}
                    //                    src={'result.pet.image'}
                    alt={result.pet.name}
                    objectFit="cover"
                  /> */}
                  <Text marginStart="size-200">{result.pet.name}</Text>
                </Flex>
              </Radio>
            </Well>
          ))}
        </RadioGroup>
      </View>
      <Footer />
    </Provider>
  );
};

export default PetSelect;
