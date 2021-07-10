import {
  Provider,
  defaultTheme,
  View,
  Text,
  ActionButton,
  Link,
} from "@adobe/react-spectrum";
import Header from "./Header";
import Footer from "./Footer";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { getCareLogs } from "../api/CareLog";
//import { CareCategory } from "../types";

const CareLogs = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [careLogs, setCareLogs] = useState<any[]>([]);
  const history = useHistory();
  if (!cookies.authToken) history.push("/login");
  useEffect(() => {
    (async () => {
      const resultCareLogs = await getCareLogs(cookies.meId, cookies.authToken);
      setCareLogs(resultCareLogs);
    })();
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
          記録一覧
        </Text>
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
                  <Text>{careLog.care_category.name}</Text>
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
                      const day = dateTime.getMonth();
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
        <View marginBottom="size-100">
          <Link variant="secondary" margin="size-100" isQuiet>
            <RouterLink to="/care/log/add">
              <ActionButton bottom="size-0" width="calc(100% - size-200)">
                <Text>記録する</Text>
              </ActionButton>
            </RouterLink>
          </Link>
        </View>
      </View>
      <Footer />
    </Provider>
  );
};

export default CareLogs;
