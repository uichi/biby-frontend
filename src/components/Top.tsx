import {
  Provider,
  defaultTheme,
  View,
  Text,
  Flex,
  Image,
  Link,
  ActionButton,
  Heading,
} from "@adobe/react-spectrum";
import { Link as RouterLink } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { getPet } from "../api/Pet";
import { getCareLogs } from "../api/CareLog";
import Loading from "./common/Loading";
import scrollToTop from "./common/scrollToTop";
import SampleImage from "../assets/images/sample.png";

const Top = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>(SampleImage);
  const [birthday, setBirthday] = useState<string>("");
  const [welcomeDay, setWelcomeDay] = useState<string>("");
  const [careLogs, setCareLogs] = useState<any[]>([]);
  const history = useHistory();
  scrollToTop();
  if (!cookies.authToken) history.push("/login");
  useEffect(() => {
    let cleanedUp = false;
    (async () => {
      const pet = await getPet(cookies.selectedPet, cookies.authToken);
      if (pet) {
        if (cleanedUp) return;
        setName(pet.name);
        setImageUrl(pet.image);
        // NOTE: undefinedになる可能性があるstateはsetしないように制御
        if (pet.birthday) setBirthday(pet.birthday);
        if (pet.welcome_day) setWelcomeDay(pet.welcome_day);
      }
      const resultCareLogs = await getCareLogs(
        cookies.meId,
        cookies.selectedPet,
        "today",
        cookies.authToken
      );
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
        minHeight="84vh"
        paddingTop="8vh"
        paddingBottom="8vh"
      >
        {((): any => {
          if (cookies.selectedPet)
            return (
              <View
                margin="size-100"
                marginTop="size-200"
                borderWidth="thin"
                borderColor="dark"
                borderRadius="small"
                backgroundColor="gray-400"
                padding="size-100"
              >
                <Flex marginBottom="size-100">
                  <Image
                    width="100px"
                    height="100px"
                    src={imageUrl}
                    alt=""
                    objectFit="cover"
                  />

                  <Flex direction="column" marginStart="size-200">
                    <Heading
                      level={3}
                      margin="size-0"
                      marginTop="size-0"
                      marginBottom="size-100"
                    >
                      {name}
                    </Heading>
                    {(() => {
                      const date = new Date(birthday);
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
                      const date = new Date(welcomeDay);
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
              </View>
            );
        })()}
        <View
          marginStart="size-100"
          marginBottom="size-200"
          marginTop="size-100"
        >
          <Link variant="secondary" isQuiet>
            <RouterLink to={"/pet/select/"}>
              <ActionButton bottom="size-0" width="calc(100% - size-100)">
                <Text>ペット選択</Text>
              </ActionButton>
            </RouterLink>
          </Link>
        </View>
        <View marginStart="size-100">
          <h3>今日の記録</h3>
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
                      const month = ("00" + (dateTime.getMonth() + 1)).slice(
                        -2
                      );
                      const day = ("00" + dateTime.getDate()).slice(-2);
                      const hour = ("00" + dateTime.getHours()).slice(-2);
                      const minute = ("00" + dateTime.getMinutes()).slice(-2);
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
