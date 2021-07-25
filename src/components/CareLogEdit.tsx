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
import { getPets } from "../api/Pet";
import { getCareLog, patchCareLog, deleteCareLog } from "../api/CareLog";
import { CareCategory } from "../types";
import {
  notifySuccessSave,
  notifyErrorSave,
  notifyEssentialValueIsEmpty,
} from "./common/toast";
import Loading from "./common/Loading";
import scrollToTop from "./common/scrollToTop";

const CareLogEdit = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [careCategory, setCareCategory] = useState<any>();
  const [careCategories, setCareCategories] = useState<CareCategory[]>([]);
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
  const [pets, setPets] = useState<any[]>([]);
  const [petId, setPetId] = useState<number>();
  scrollToTop();
  if (!cookies.authToken) history.push("/login");
  useEffect(() => {
    let cleanedUp = false;
    (async () => {
      const careLogId = location.pathname.split("/").slice(-1)[0];
      const resultGetLog = await getCareLog(careLogId, cookies.authToken);
      const today = new Date(resultGetLog.date_time);
      const year = today.getFullYear();
      const month = ("00" + (today.getMonth() + 1)).slice(-2);
      const day = ("00" + today.getDate()).slice(-2);
      const hour = ("00" + today.getHours()).slice(-2);
      const minute = ("00" + today.getMinutes()).slice(-2);
      // NOTE: ログインユーザーの持っているカテゴリ全てを取得
      const resultGetCareCategories: CareCategory[] = await getCategories(
        cookies.meId,
        cookies.authToken
      );
      const resultGetPets = await getPets(cookies.meId, cookies.authToken);
      if (cleanedUp) return;
      setPets(
        resultGetPets.map((value) => ({
          id: value.pet.id,
          name: value.pet.name,
        }))
      );
      setSelectedCareLogId(careLogId);
      setPetId(resultGetLog.pet_pk);
      setText(resultGetLog.text);
      setInteger(resultGetLog.integer);
      setFloat(resultGetLog.float);
      setDateTime(`${year}-${month}-${day}T${hour}:${minute}`);
      setMemo(resultGetLog.memo);
      setCareCategory({
        id: resultGetLog.care_category.id,
        name: resultGetLog.care_category.input_type,
        unit: resultGetLog.care_category.unit,
      });
      // NOTE: 開いている記録が持っているカテゴリー
      const resultGetCareCategory = resultGetLog.care_category;
      const savedCareCategory: CareCategory = {
        id: resultGetCareCategory.id,
        name: resultGetCareCategory.name,
        icon: resultGetCareCategory.icon,
        input_type: resultGetCareCategory.input_type,
        unit: resultGetCareCategory.unit,
        is_daily_routine: resultGetCareCategory.is_daily_routine,
        user: resultGetCareCategory.user,
      };
      const duplicateCareCategory = resultGetCareCategories.find(
        (value) => value.name === savedCareCategory.name
      );
      /* NOTE: ログインユーザーが持っているカテゴリと記録の持っているカテゴリが重複している場合、
       * ログインユーザーの持っているカテゴリのIDをsetFieldTypeIdに入れる
       */
      if (duplicateCareCategory) {
        setFieldTypeId(resultGetCareCategory.id);
      } else {
        setFieldTypeId(resultGetLog.care_category.id);
        resultGetCareCategories.push(savedCareCategory);
      }
      setCareCategories(resultGetCareCategories);
      setIsLoaded(false);
    })();
    const cleanup = () => {
      cleanedUp = true;
    };
    return cleanup;
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
      careCategory.input_type === "text" ? text : null,
      careCategory.input_type === "integer" ? integer : null,
      careCategory.input_type === "float" ? float : null,
      memo,
      cookies.meId,
      String(petId),
      cookies.authToken
    );
    if (!resultUpdateCareLog) {
      notifyErrorSave();
      return;
    }
    //    notifySuccessSave();
    history.push("/care/logs");
  };
  // HACK: 型指定見直す
  const onChangeInputType = (categoryId: any): void => {
    setCareCategory(careCategories.find((value) => value.id === categoryId));
    setFieldTypeId(categoryId);
  };
  const removeCareLog = async () => {
    await deleteCareLog(selectedCareLogId, cookies.authToken);
    history.push("/care/logs");
  };
  const onChangePet = (value: any): void => {
    setPetId(value);
  };
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      {isLoaded && <Loading />}
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
          <h3 id="label-3">記録編集</h3>
          <Form aria-labelledby="label-3" necessityIndicator="icon">
            <Picker
              label="ペットを選択してください"
              items={pets}
              selectedKey={petId}
              onSelectionChange={onChangePet}
              isRequired={true}
            >
              {(item) => <Item>{item.name}</Item>}
            </Picker>
            <TextField
              type="datetime-local"
              label="日付"
              value={dateTime}
              onChange={setDateTime}
              isRequired={true}
            />
            <Picker
              label="カテゴリを選択してください"
              items={careCategories.map((value) => ({
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
              if (!careCategory) return;
              if (careCategory.input_type === "text")
                return (
                  <TextField
                    label="テキスト"
                    placeholder=""
                    defaultValue={!text ? "" : text}
                    onChange={setText}
                  />
                );
              if (careCategory.input_type === "integer")
                return (
                  <NumberField
                    label={"整数" + " (" + careCategory.unit + ")"}
                    defaultValue={!integer ? 0 : integer}
                    onChange={setInteger}
                  />
                );
              if (careCategory.input_type === "float")
                return (
                  <NumberField
                    label={"小数" + " (" + careCategory.unit + ")"}
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
