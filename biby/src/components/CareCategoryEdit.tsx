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
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useCookies } from "react-cookie";
import Header from "./Header";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import {
  notifySuccessSave,
  notifyEssentialValueIsEmpty,
  notifyErrorSave,
  notifyErrorGet,
} from "./common/toast";
import { Toaster } from "react-hot-toast";
import { getCareCategory, patchCareCategory } from "../api/CareCategory";

const CareCategoryEdit = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [name, setName] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [careCategoryId, setCareCategoryId] = useState<string>("");
  const history = useHistory();
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
  if (!cookies.authToken) history.push("/login");
  useEffect(() => {
    (async () => {
      const selectedCareCategoryId = location.pathname.split("/").slice(-1)[0];
      setCareCategoryId(selectedCareCategoryId);
      const resultGetCareCategory = await getCareCategory(
        selectedCareCategoryId,
        cookies.authToken
      );
      if (resultGetCareCategory) {
        setName(resultGetCareCategory.name);
        setFieldTypeId(resultGetCareCategory.input_type);
        setUnit(resultGetCareCategory.unit);
        return;
      }
      notifyErrorGet();
    })();
  }, []);
  // HACK: 型指定見直す
  const onChangeInputType = (value: any): void => {
    setFieldTypeId(value);
    if (["text", "checkbox"].indexOf(value) !== -1) setUnit("");
  };
  const updateCareCategory = async () => {
    if (name === "" || fieldTypeId === "") {
      notifyEssentialValueIsEmpty();
      return;
    }
    const resultUpdateCareCategory = await patchCareCategory(
      careCategoryId,
      name,
      fieldTypeId,
      unit,
      cookies.meId,
      cookies.authToken
    );
    if (!resultUpdateCareCategory) {
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
          <h3 id="label-3">記録</h3>
          <Form aria-labelledby="label-3" necessityIndicator="icon">
            <TextField
              label="タイトル"
              placeholder="タイトル"
              value={name}
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
                return (
                  <TextField label="単位" value={unit} onChange={setUnit} />
                );
              return;
            })()}
            <ActionButton staticColor="white" onPress={updateCareCategory}>
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
