import {
  Provider,
  defaultTheme,
  View,
  Text,
  Well,
  Flex,
  Image,
  Link,
  ActionButton,
} from "@adobe/react-spectrum";
import { Link as RouterLink } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { getPet } from "../api/Pet";
import { getCareLogs } from "../api/CareLog";

const Top = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [name, setName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [welcomeDay, setWelcomeDay] = useState<string>("");
  const [careLogs, setCareLogs] = useState<any[]>([]);
  const history = useHistory();
  if (!cookies.authToken) history.push("/login");
  useEffect(() => {
    let cleanedUp = false;
    (async () => {
      // FIXME: リロードするとcookies.selectedPetが消えてしまう
      const pet = await getPet(cookies.selectedPet, cookies.authToken);
      if (pet) {
        if (cleanedUp) return;
        setName(pet.name);
        setImageUrl(pet.image);
        // NOTE: undefinedになる可能性があるstateはsetしないように制御
        if (pet.birthday) setBirthday(pet.birthday);
        if (pet.welcome_day) setWelcomeDay(pet.welcome_day);
      }
      const resultCareLogs = await getCareLogs(cookies.meId, cookies.authToken);
      setCareLogs(resultCareLogs);
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
      >
        <Well margin="size-100">
          <Flex>
            <Image
              width="100px"
              height="100px"
              src={imageUrl}
              alt=""
              objectFit="cover"
            />
            <Flex direction="column" marginStart="size-100">
              <Text>{name}</Text>
              <Text>{birthday}</Text>
              <Text>{welcomeDay}</Text>
            </Flex>
          </Flex>
        </Well>
        <View marginStart="size-100" marginBottom="size-200">
          <Link variant="secondary" isQuiet>
            <RouterLink to={"/pet/select/"}>
              <ActionButton bottom="size-0" width="calc(100% - size-100)">
                <Text>ペット選択</Text>
              </ActionButton>
            </RouterLink>
          </Link>
        </View>
        {/* <Text marginStart="size-100">毎日の日課</Text>
        <View
          alignSelf="center"
          backgroundColor="gray-400"
          borderRadius="small"
          padding="size-100"
          margin="size-100"
          height="size-800"
        >
          <View marginBottom="size-100">
            <Text>散歩</Text>
          </View>
          <View>
            <Text>2021年7月1日 12:00:00</Text>
          </View>
          <View>
            <Text>30分</Text>
          </View>
        </View>
        <View
          alignSelf="center"
          backgroundColor="gray-400"
          borderRadius="small"
          padding="size-100"
          margin="size-100"
          height="size-800"
        >
          <View marginBottom="size-100">
            <Text>散歩</Text>
          </View>
          <View>
            <Text>2021年7月1日 12:00:00</Text>
          </View>
          <View>
            <Text>30分</Text>
          </View>
        </View>
        <View
          alignSelf="center"
          backgroundColor="gray-400"
          borderRadius="small"
          padding="size-100"
          margin="size-100"
          height="size-800"
        >
          <View marginBottom="size-100">
            <Text>散歩</Text>
          </View>
          <View>
            <Text>2021年7月1日 12:00:00</Text>
          </View>
          <View>
            <Text>30分</Text>
          </View>
        </View> */}
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
      </View>
      <Footer />
    </Provider>
  );
};

export default Top;
