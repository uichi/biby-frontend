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
  NumberField,
  Picker,
  Item,
} from "@adobe/react-spectrum";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getCategories } from "../api/CareCategory";
import { getCareLog, patchCareLog, deleteCareLog } from "../api/CareLog";
import { CareCategory } from "../types";
import {
  notifySuccessSave,
  notifyErrorSave,
  notifyEssentialValueIsEmpty,
} from "./common/toast";

const CareLogEdit = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [inputType, setInputType] = useState<any>();
  const [inputTypes, setInputTypes] = useState<any[]>([]);
  const [categories, setCategories] = useState<CareCategory[]>([]);
  const [dateTime, setDateTime] = useState<string>("");
  const [text, setText] = useState<string | null>(null);
  const [integer, setInteger] = useState<number | null>(null);
  const [float, setFloat] = useState<number | null>(null);
  const [memo, setMemo] = useState<string | null>(null);
  const [selectedCareLogId, setSelectedCareLogId] = useState<string>("");
  const history = useHistory();
  const [fieldTypeId, setFieldTypeId]: [
    string,
    Dispatch<SetStateAction<any>> // HACK: 型定義見直す
  ] = useState<string>("");
  if (!cookies.authToken) history.push("/login");
  useEffect(() => {
    (async () => {
      const selectedCareLogId = location.pathname.split("/").slice(-1)[0];
      setSelectedCareLogId(selectedCareLogId);
      const resultGetLog = await getCareLog(
        selectedCareLogId,
        cookies.authToken
      );
      setText(resultGetLog.text);
      setInteger(resultGetLog.integer);
      setFloat(resultGetLog.float);
      setFieldTypeId(resultGetLog.care_category.id);
      const today = new Date(resultGetLog.date_time);
      const year = today.getFullYear();
      const month = ("00" + (today.getMonth() + 1)).slice(-2);
      const day = ("00" + today.getDate()).slice(-2);
      const hour = today.getHours();
      const minute = today.getMinutes();
      setDateTime(`${year}-${month}-${day}T${hour}:${minute}`);
      setMemo(resultGetLog.memo);
      setInputType({
        id: resultGetLog.care_category.id,
        name: resultGetLog.care_category.input_type,
        unit: resultGetLog.care_category.unit,
      });
      const resultGetCareCategories = await getCategories(
        cookies.meId,
        cookies.authToken
      );
      setCategories(resultGetCareCategories);
      setInputTypes(
        resultGetCareCategories.map((value) => ({
          id: value.id,
          name: value.input_type,
          unit: value.unit,
        }))
      );
    })();
  }, []);
  const updateCareLog = async () => {
    if (fieldTypeId === "" || dateTime === "") {
      notifyEssentialValueIsEmpty();
      return;
    }
    const resultUpdateCareLog = await patchCareLog(
      selectedCareLogId,
      fieldTypeId,
      dateTime,
      inputType.name === "text" ? text : null,
      inputType.name === "integer" ? integer : null,
      inputType.name === "float" ? float : null,
      memo,
      cookies.meId,
      cookies.authToken
    );
    console.log(resultUpdateCareLog);
    if (!resultUpdateCareLog) {
      notifyErrorSave();
      return;
    }
    notifySuccessSave();
  };
  // HACK: 型指定見直す
  const onChangeInputType = (categoryId: any): void => {
    setInputType(inputTypes.find((value) => value.id === categoryId));
    setFieldTypeId(categoryId);
  };
  const removeCareLog = async () => {
    await deleteCareLog(selectedCareLogId, cookies.authToken);
    history.push("/care/logs");
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
              type="datetime-local"
              label="日付"
              value={dateTime}
              onChange={setDateTime}
              isRequired={true}
            />
            <Picker
              label="カテゴリを選択してください"
              items={categories.map((value) => ({
                id: value.id,
                name: value.name,
                input_type: value.input_type,
              }))}
              selectedKey={fieldTypeId}
              onSelectionChange={onChangeInputType}
              isRequired={true}
            >
              {(item) => <Item>{item.name}</Item>}
            </Picker>
            {((): any => {
              if (!inputType) return;
              if (inputType.name === "text")
                return (
                  <TextField
                    label="テキスト"
                    placeholder=""
                    defaultValue={!text ? "" : text}
                    onChange={setText}
                  />
                );
              if (inputType.name === "integer")
                return (
                  <NumberField
                    label={"整数" + " (" + inputType.unit + ")"}
                    defaultValue={!integer ? 0 : integer}
                    onChange={setInteger}
                  />
                );
              if (inputType.name === "float")
                return (
                  <NumberField
                    label={"小数" + " (" + inputType.unit + ")"}
                    defaultValue={!float ? 0 : float}
                    onChange={setFloat}
                  />
                );
            })()}
            <TextArea
              label="メモ"
              height="size-1600"
              defaultValue={!memo ? "" : memo}
              onChange={setMemo}
            />
            <ActionButton staticColor="white" onPress={updateCareLog}>
              保存
            </ActionButton>
            <DialogTrigger>
              <ActionButton>削除</ActionButton>
              <AlertDialog
                variant="destructive"
                title="削除しますか？"
                primaryActionLabel="削除"
                onPrimaryAction={removeCareLog}
                cancelLabel="キャンセル"
              >
                一度削除すると復元はできません。
              </AlertDialog>
            </DialogTrigger>
          </Form>
        </View>
      </View>
      <Footer />
    </Provider>
  );
};

export default CareLogEdit;
