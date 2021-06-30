import {
  Provider,
  defaultTheme,
  View,
  Form,
  TextField,
  ActionButton,
  Picker,
  Item,
} from "@adobe/react-spectrum";
import { useState, Dispatch, SetStateAction } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { postCareCategory } from "../api/CareCategory";
import {
  notifySuccessSave,
  notifyEssentialValueIsEmpty,
  notifyErrorSave,
} from "./common/toast";
import { Toaster } from "react-hot-toast";

const CareCategoryEdit = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [name, setName] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
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
  // HACK: 型指定見直す
  const onChangeInputType = (value: any): void => {
    setFieldTypeId(value);
    if (["text", "checkbox"].indexOf(value) !== -1) setUnit("");
  };
  const addCareCategory = async () => {
    if (name === "" || fieldTypeId === "") {
      notifyEssentialValueIsEmpty();
      return;
    }
    const resultAddCareCategory = await postCareCategory(
      name,
      fieldTypeId,
      unit,
      cookies.meId,
      cookies.authToken
    );
    if (!resultAddCareCategory) {
      notifyErrorSave();
      return;
    }
    notifySuccessSave();
  };
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <Toaster position="top-center" />
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
            <TextField
              label="カテゴリ名"
              isRequired={true}
              onChange={setName}
            />
            <Picker
              label="フィールドのタイプを選択してください"
              items={options}
              selectedKey={fieldTypeId}
              onSelectionChange={onChangeInputType}
              isRequired={true}
            >
              {(item) => <Item>{item.name}</Item>}
            </Picker>
            {((): any => {
              if (["integer", "float"].indexOf(fieldTypeId) !== -1)
                return <TextField label="単位" onChange={setUnit} />;
            })()}
            <ActionButton staticColor="white" onPress={addCareCategory}>
              保存
            </ActionButton>
          </Form>
        </View>
      </View>
      <Footer />
    </Provider>
  );
};

export default CareCategoryEdit;
