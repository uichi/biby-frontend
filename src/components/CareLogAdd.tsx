import {
  Provider,
  defaultTheme,
  View,
  Form,
  TextField,
  ActionButton,
  TextArea,
  NumberField,
  Picker,
  Item,
} from "@adobe/react-spectrum";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useCookies } from "react-cookie";
import Header from "./Header";
import Footer from "./Footer";
import { useHistory, Redirect } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getCategories } from "../api/CareCategory";
import { CareCategory } from "../types";
import { getCareLogs, postCareLog } from "../api/CareLog";
import {
  notifySuccessSave,
  notifyErrorSave,
  notifyEssentialValueIsEmpty,
} from "./common/toast";
import { getPets } from "../api/Pet";
import Loading from "./common/Loading";

const CareLogAdd = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  if (!cookies.authToken) return <Redirect to="/login" />;
  const today = new Date();
  const year = today.getFullYear();
  const month = ("00" + (today.getMonth() + 1)).slice(-2);
  const day = ("00" + today.getDate()).slice(-2);
  const hour = ("00" + today.getHours()).slice(-2);
  const minute = ("00" + today.getMinutes()).slice(-2);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [inputType, setInputType] = useState<any>();
  const [inputTypes, setInputTypes] = useState<any[]>([]);
  const [categories, setCategories] = useState<CareCategory[]>([]);
  const [dateTime, setDateTime] = useState<string>(
    `${year}-${month}-${day}T${hour}:${minute}`
  );
  const [text, setText] = useState<string | null>(null);
  const [integer, setInteger] = useState<number | null>(null);
  const [float, setFloat] = useState<number | null>(null);
  const [memo, setMemo] = useState<string | null>(null);
  const [pets, setPets] = useState<any[]>([]);
  const [petId, setPetId] = useState<number>();
  const [fieldTypeId, setFieldTypeId]: [
    string,
    Dispatch<SetStateAction<any>> // HACK: 型定義見直す
  ] = useState<string>("");
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const resultCareLogs = await getCareLogs(
        cookies.meId,
        cookies.selectedPet,
        "",
        cookies.authToken
      );
      if (resultCareLogs.length >= 400) return <Redirect to="/care/logs" />;
      const resultGetPets = await getPets(cookies.meId, cookies.authToken);
      setPets(
        resultGetPets.map((value) => ({
          id: value.pet.id,
          name: value.pet.name,
        }))
      );
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
      setIsLoaded(false);
    })();
    setPetId(Number(cookies.selectedPet));
  }, []);
  const addCareLog = async () => {
    if (fieldTypeId === "" || dateTime === "") {
      notifyEssentialValueIsEmpty();
      return;
    }
    const resultAddCareLog = await postCareLog(
      fieldTypeId,
      dateTime,
      inputType.name === "text" ? text : null,
      inputType.name === "integer" ? integer : null,
      inputType.name === "float" ? float : null,
      memo,
      cookies.meId,
      String(petId),
      cookies.authToken
    );
    if (!resultAddCareLog) {
      notifyErrorSave();
      return;
    }
    notifySuccessSave();
    history.push("/care/logs");
  };
  // HACK: 型指定見直す
  const onChangeInputType = (categoryId: any): void => {
    setInputType(inputTypes.find((value) => value.id === categoryId));
    setFieldTypeId(categoryId);
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
        minHeight="92vh"
        paddingTop="8vh"
        // paddingBottom="8vh"
      >
        <View margin="size-100">
          <Form aria-labelledby="label-3" necessityIndicator="icon">
            <h3 id="label-3">記録追加</h3>
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
                    placeholder="テキスト"
                    onChange={setText}
                  />
                );
              if (inputType.name === "integer")
                return (
                  <NumberField
                    label={"整数" + " (" + inputType.unit + ")"}
                    defaultValue={0}
                    onChange={setInteger}
                  />
                );
              if (inputType.name === "float")
                return (
                  <NumberField
                    label={"小数" + " (" + inputType.unit + ")"}
                    defaultValue={0}
                    onChange={setFloat}
                  />
                );
            })()}
            <TextArea label="メモ" height="size-1600" onChange={setMemo} />
            <ActionButton staticColor="white" onPress={addCareLog}>
              保存
            </ActionButton>
          </Form>
        </View>
      </View>
      <Footer />
    </Provider>
  );
};

export default CareLogAdd;
