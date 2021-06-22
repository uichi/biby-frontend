import {
  Provider,
  defaultTheme,
  View,
  Image,
  Form,
  TextField,
  RadioGroup,
  Radio,
  DialogTrigger,
  ActionButton,
  AlertDialog,
} from "@adobe/react-spectrum";
import Header from "./Header";
import Footer from "./Footer";

const PetEdit = (): JSX.Element => {
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
        <View margin="size-100">
          <Image
            width="150px"
            height="150px"
            src="https://i.imgur.com/c3gTKSJ.jpg"
            alt=""
            objectFit="cover"
            marginBottom="size-100"
          />
          <ActionButton>画像を登録</ActionButton>
          <h3 id="label-3">ぽち</h3>
          <Form aria-labelledby="label-3" necessityIndicator="icon">
            <TextField label="名前" placeholder="ぽち" isRequired={true} />
            <TextField label="誕生日" placeholder="2020年7月1日" />
            <TextField label="家族になった日" placeholder="2020年7月1日" />
            <RadioGroup label="性別">
              <Radio value="male">オス</Radio>
              <Radio value="female">メス</Radio>
            </RadioGroup>
            <ActionButton type="submit" staticColor="white" autoFocus={true}>
              保存
            </ActionButton>
            <DialogTrigger>
              <ActionButton>削除</ActionButton>
              <AlertDialog
                variant="destructive"
                title="削除しますか？"
                primaryActionLabel="削除"
                cancelLabel="キャンセル"
              >
                これまで記録したデータも削除されます。
              </AlertDialog>
            </DialogTrigger>
          </Form>
        </View>
      </View>
      <Footer />
    </Provider>
  );
};

export default PetEdit;
