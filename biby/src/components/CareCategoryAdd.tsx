import {
  Provider,
  defaultTheme,
  View,
  Form,
  TextField,
  DialogTrigger,
  ActionButton,
  AlertDialog,
  TextArea,
} from "@adobe/react-spectrum";
import { ComboBox, Item } from "@react-spectrum/combobox";
import { useState, Dispatch, SetStateAction } from "react";
import Header from "./Header";
import Footer from "./Footer";

const CareCategoryEdit = (): JSX.Element => {
  const [fieldTypeId, setFieldTypeId]: [
    number,
    Dispatch<SetStateAction<any>> // HACK: 型定義見直す
  ] = useState<number>(0);
  const options = [
    { id: 1, name: "テキスト" },
    { id: 2, name: "整数" },
    { id: 3, name: "小数" },
    { id: 4, name: "チェックボックス" },
  ];

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
          <h3 id="label-3">記録</h3>
          <Form aria-labelledby="label-3" necessityIndicator="icon">
            <TextField
              label="タイトル"
              placeholder="タイトル"
              isRequired={true}
            />
            <p>This id is {fieldTypeId}</p>
            <ComboBox
              label="フィールドのタイプを選択してください"
              defaultItems={options}
              onSelectionChange={setFieldTypeId}
            >
              {(item) => <Item>{item.name}</Item>}
            </ComboBox>
            <TextArea label="メモ" height="size-3000" />
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
