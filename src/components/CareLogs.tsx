import {
  Provider,
  defaultTheme,
  View,
  Text,
  ActionButton,
  Link,
  Heading,
} from "@adobe/react-spectrum";
import Header from "./Header";
import Footer from "./Footer";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { getCareLogs } from "../api/CareLog";
//import { CareCategory } from "../types";
import Loading from "./common/Loading";
import scrollToTop from "./common/scrollToTop";

const CareLogs = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [careLogs, setCareLogs] = useState<any[]>([]);
  const history = useHistory();
  scrollToTop();
  if (!cookies.authToken) history.push("/login");
  useEffect(() => {
    let cleanedUp = false;
    (async () => {
      const resultCareLogs = await getCareLogs(
        cookies.meId,
        cookies.selectedPet,
        "",
        cookies.authToken
      );
      if (cleanedUp) return;
      setCareLogs(resultCareLogs);
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
        minHeight="76vh"
        paddingTop="8vh"
        paddingBottom="20vh"
      >
        <View marginStart="size-100">
          <h3>記録一覧</h3>
        </View>
        {careLogs.map((careLog, index) => (
          <Link variant="secondary" key={index} isQuiet>
            <RouterLink to={"/care/log/edit/" + careLog.id}>
              <View
                alignSelf="center"
                backgroundColor="gray-400"
                borderRadius="small"
                padding="size-100"
                margin="size-100"
                height="size-800"
              >
                <View>
                  <Heading level={3} margin="size-0" marginBottom="size-50">
                    {careLog.care_category.name}
                  </Heading>
                </View>
                <View>
                  {(() => {
                    if (careLog.care_category.input_type === "text")
                      return <Text>{careLog.text}</Text>;
                    if (careLog.care_category.input_type === "integer")
                      return (
                        <Text>
                          {careLog.integer} {careLog.care_category.unit}
                        </Text>
                      );
                    if (careLog.care_category.input_type === "float")
                      return (
                        <Text>
                          {careLog.float} {careLog.care_category.unit}
                        </Text>
                      );
                  })()}
                  <View>
                    {(() => {
                      const dateTime = new Date(careLog.date_time);
                      const year = dateTime.getFullYear();
                      const month = dateTime.getMonth() + 1;
                      const day = dateTime.getDate();
                      const hour = dateTime.getHours();
                      const minute = dateTime.getMinutes();
                      return (
                        <Text>
                          日時：{year}年{month}月{day}日 {hour}時{minute}分
                        </Text>
                      );
                    })()}
                  </View>
                </View>
              </View>
            </RouterLink>
          </Link>
        ))}
        {(() => {
          if (careLogs.length !== 400) {
            return (
              <View position="fixed" width="100%" bottom="size-700">
                <Link variant="secondary" margin="size-100" isQuiet>
                  <RouterLink to="/care/log/add">
                    <ActionButton bottom="size-0" width="calc(100% - size-200)">
                      <Text>記録する</Text>
                    </ActionButton>
                  </RouterLink>
                </Link>
              </View>
            );
          } else {
            return (
              <View position="fixed" width="100%" bottom="size-700">
                <ActionButton
                  bottom="size-0"
                  width="calc(100% - size-200)"
                  isDisabled
                >
                  <Text>フリープランの場合登録は400までです</Text>
                </ActionButton>
              </View>
            );
          }
        })()}
      </View>
      <Footer />
    </Provider>
  );
};

export default CareLogs;
