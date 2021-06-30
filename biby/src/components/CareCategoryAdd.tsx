import {
  Provider,
  defaultTheme,
  View,
  Form,
  TextField,
  DialogTrigger,
  ActionButton,
  AlertDialog,
  Picker,
  Item,
} from "@adobe/react-spectrum";
import { useState, Dispatch, SetStateAction } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const CareCategoryEdit = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [fieldTypeId, setFieldTypeId]: [
    string,
    Dispatch<SetStateAction<any>> // HACK: 型定義見直す
  ] = useState<string>("text");
  const options = [
    { id: "text", name: "テキスト" },
    { id: "integer", name: "整数" },
    { id: "float", name: "小数" },
    //    { id: 'checkbox', name: "チェックボックス" },
  ];
  const history = useHistory();
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
        <View margin="size-100">
          <h3 id="label-3">カテゴリー追加</h3>
          <Form aria-labelledby="label-3" necessityIndicator="icon">
            <TextField label="カテゴリ名" isRequired={true} />
            <Picker
              label="フィールドのタイプを選択してください"
              items={options}
              selectedKey={fieldTypeId}
              onSelectionChange={setFieldTypeId}
              isRequired={true}
            >
              {(item) => <Item>{item.name}</Item>}
            </Picker>
            {((): any => {
              if (["integer", "float"].indexOf(fieldTypeId) !== -1)
                return <TextField label="単位" />;
            })()}
            <ActionButton type="submit" staticColor="white">
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

export default CareCategoryEdit;
