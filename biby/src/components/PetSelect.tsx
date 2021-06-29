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

const PetSelect = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [pets, setPets] = useState<{ pet: Pet }[]>([]);
  const history = useHistory();
  if (!cookies.authToken) history.push("/login");
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
        <RadioGroup
          label="ペット選択"
          margin="size-100"
          defaultValue={cookies.selectedPet}
          value={cookies.selectedPet}
          onChange={(value) => {
            setCookie("selectedPet", value);
          }}
          isEmphasized
        >
          {pets.map((result, index) => (
            <Well key={index}>
              <Radio value={result.pet.id.toString()} width="100%">
                <Flex>
                  <Image
                    width="50px"
                    height="50px"
                    src={result.pet.image}
                    alt={result.pet.name}
                    objectFit="cover"
                  />
                  <Text>{result.pet.name}</Text>
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
