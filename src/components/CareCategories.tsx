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
import { Redirect } from "react-router-dom";
import { getCategories } from "../api/CareCategory";
import { CareCategory } from "../types";
import Loading from "./common/Loading";
import scrollToTop from "./common/scrollToTop";

const CareCategories = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  if (!cookies.authToken) return <Redirect to="/login" />;
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [careCategories, setCareCategories] = useState<CareCategory[]>([]);
  scrollToTop();
  useEffect(() => {
    let cleanedUp = false;
    (async () => {
      const resultCareCategories = await getCategories(
        cookies.meId,
        cookies.authToken
      );
      if (cleanedUp) return;
      setCareCategories(resultCareCategories);
      setIsLoaded(false);
    })();
    const cleanup = () => {
      cleanedUp = true;
    };
    return cleanup;
  }, []);
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      {isLoaded && <Loading />}
      <Header />
      <View
        backgroundColor="gray-200"
        gridArea="content"
        minHeight="100vh"
        paddingTop="8vh"
        paddingBottom="20vh"
      >
        <View marginStart="size-100" marginTop="size-100">
          <h2>カテゴリ一覧</h2>
        </View>
        {careCategories.map((careCategory, index) => (
          <View
            alignSelf="center"
            backgroundColor="gray-400"
            borderRadius="small"
            padding="size-100"
            paddingTop="size-115"
            margin="size-100"
            minHeight="size-500"
            key={index}
          >
            <Link variant="secondary" isQuiet>
              <RouterLink to={"/care/category/edit/" + careCategory.id}>
                <View>
                  <Text>{careCategory.name}</Text>
                </View>
              </RouterLink>
            </Link>
          </View>
        ))}
        <View position="fixed" width="100%" bottom="size-700">
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
