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
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { getCategories } from "../api/CareCategory";
import { CareCategory } from "../types";

const CareCategories = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [careCategories, setCareCategories] = useState<CareCategory[]>([]);
  const history = useHistory();
  if (!cookies.authToken) history.push("/login");
  useEffect(() => {
    let cleanedUp = false;
    (async () => {
      const resultCareCategories = await getCategories(
        cookies.meId,
        cookies.authToken
      );
      if (cleanedUp) return;
      setCareCategories(resultCareCategories);
    })();
    const cleanup = () => {
      cleanedUp = true;
    };
    return cleanup;
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
        marginTop="size-100"
      >
        <Text marginStart="size-100" marginTop="size-500">
          カテゴリ一覧
        </Text>
        {careCategories.map((careCategory, index) => (
          <View
            alignSelf="center"
            backgroundColor="gray-400"
            borderRadius="small"
            padding="size-100"
            margin="size-100"
            height="size-300"
            key={index}
          >
            <Link variant="secondary" isQuiet>
              <RouterLink to={"/care/category/edit/" + careCategory.id}>
                <View marginBottom="size-100">
                  <Text>{careCategory.name}</Text>
                </View>
              </RouterLink>
            </Link>
          </View>
        ))}
        <View marginBottom="size-100">
          <Link variant="secondary" margin="size-100" isQuiet>
            <RouterLink to="/care/category/add/">
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

export default CareCategories;
