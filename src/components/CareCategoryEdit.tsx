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
  Checkbox,
} from "@adobe/react-spectrum";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useCookies } from "react-cookie";
import Header from "./Header";
import Footer from "./Footer";
import { Redirect } from "react-router-dom";
import {
  notifySuccessSave,
  notifyEssentialValueIsEmpty,
  notifyErrorSave,
  notifyErrorGet,
} from "./common/toast";
import { Toaster } from "react-hot-toast";
import {
  getCareCategory,
  patchCareCategory,
  deleteCareCategory,
} from "../api/CareCategory";
import Loading from "./common/Loading";

const CareCategoryEdit = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  if (!cookies.authToken) return <Redirect to="/login" />;
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [isDailyRoutine, setIsDailyRoutine] = useState<boolean>(false);
  const [careCategoryId, setCareCategoryId] = useState<string>("");
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
  useEffect(() => {
    let cleanedUp = false;
    (async () => {
      const selectedCareCategoryId = location.pathname.split("/").slice(-1)[0];
      const resultGetCareCategory = await getCareCategory(
        selectedCareCategoryId,
        cookies.authToken
      );
      if (resultGetCareCategory) {
        if (cleanedUp) return;
        setCareCategoryId(selectedCareCategoryId);
        setName(resultGetCareCategory.name);
        setFieldTypeId(resultGetCareCategory.input_type);
        setUnit(resultGetCareCategory.unit);
        setIsDailyRoutine(resultGetCareCategory.is_daily_routine);
        setIsLoaded(false);
        return;
      }
      notifyErrorGet();
    })();
    const cleanup = () => {
      cleanedUp = true;
    };
    return cleanup;
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
      isDailyRoutine,
      cookies.meId,
      cookies.authToken
    );
    if (!resultUpdateCareCategory) {
      notifyErrorSave();
      return;
    }
    notifySuccessSave();
    return <Redirect to="/care/categories" />;
  };
  const removeCareCategory = async () => {
    await deleteCareCategory(careCategoryId, cookies.authToken);
    return <Redirect to="/care/categories" />;
  };
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      {isLoaded && <Loading />}
      <Toaster position="top-center" />
      <Header />
      <View
        backgroundColor="gray-200"
        gridArea="content"
        minHeight="92vh"
        paddingTop="8vh"
        // paddingBottom="8vh"
      >
        <View margin="size-100">
          <h3 id="label-3">カテゴリー編集</h3>
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
            })()}
            <Checkbox isSelected={isDailyRoutine} onChange={setIsDailyRoutine}>
              毎日の日課
            </Checkbox>
            <ActionButton staticColor="white" onPress={updateCareCategory}>
              保存
            </ActionButton>
            <DialogTrigger>
              <ActionButton>削除</ActionButton>
              <AlertDialog
                variant="destructive"
                title="削除しますか？"
                primaryActionLabel="削除"
                onPrimaryAction={removeCareCategory}
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
