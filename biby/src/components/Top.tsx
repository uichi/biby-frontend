import {
  Provider,
  defaultTheme,
  Grid,
  View,
  Text,
  Well,
  Flex,
  Image,
} from "@adobe/react-spectrum";
import Home from "@spectrum-icons/workflow/Home";
import Settings from "@spectrum-icons/workflow/Settings";
import AssetsModified from "@spectrum-icons/workflow/AssetsModified";

const Top = (): JSX.Element => {
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <View
        backgroundColor="gray-400"
        position="fixed"
        top="size-0"
        width="100vw"
        height="8vh"
      >
        <Grid areas={["setting name add"]} columns={["1fr", "1fr", "1fr"]}>
          <View
            alignSelf="center"
            justifySelf="left"
            gridArea="setting"
            marginTop="size-200"
            marginStart="size-200"
          >
            <Settings size="S" color="#fff" />
          </View>
          <View
            alignSelf="center"
            justifySelf="center"
            gridArea="name"
            marginTop="size-100"
          >
            <Text>ぽち</Text>
          </View>
          <View
            alignSelf="center"
            justifySelf="right"
            gridArea="add"
            marginTop="size-100"
            marginEnd="size-100"
          >
            <Text>ペット編集</Text>
          </View>
        </Grid>
      </View>

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
              width="150px"
              height="150px"
              src="https://i.imgur.com/c3gTKSJ.jpg"
              alt=""
              objectFit="cover"
            />
            <Flex direction="column" marginStart="size-100">
              <Text>イッヌ</Text>
              <Text>誕生日</Text>
              <Text>家族になった日</Text>
            </Flex>
          </Flex>
        </Well>
        <Text marginStart="size-100" marginTop="size-500">
          毎日の日課
        </Text>
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
        </View>

        <Text marginStart="size-100" marginTop="size-500">
          本日の記録
        </Text>
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
      </View>

      <View
        backgroundColor="gray-400"
        position="fixed"
        bottom="size-0"
        width="100vw"
        height="8vh"
      >
        <Grid areas={["setting name add"]} columns={["1fr", "1fr", "1fr"]}>
          <View
            alignSelf="center"
            justifySelf="left"
            gridArea="setting"
            marginTop="size-200"
            marginStart="size-200"
          >
            <Home size="S" color="#fff" />
          </View>
          <View
            alignSelf="center"
            justifySelf="center"
            gridArea="name"
            marginTop="size-200"
          >
            <AssetsModified size="S" color="#fff" />
          </View>
          <View
            alignSelf="center"
            justifySelf="right"
            gridArea="add"
            marginTop="size-200"
            marginEnd="size-200"
          >
            <Settings size="S" color="#fff" />
          </View>
        </Grid>
      </View>
    </Provider>
  );
};

export default Top;
