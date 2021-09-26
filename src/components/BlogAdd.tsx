import {
  Provider,
  defaultTheme,
  View,
  Form,
  TextField,
  ActionButton,
  NumberField,
  Picker,
  Item,
} from "@adobe/react-spectrum";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useCookies } from "react-cookie";
import Header from "./Header";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getCategories } from "../api/CareCategory";
import { Pet, CareCategory } from "../types";
import { getCareLogs, postCareLog } from "../api/CareLog";
import {
  notifySuccessSave,
  notifyErrorSave,
  notifyEssentialValueIsEmpty,
} from "./common/toast";
import { getPets } from "../api/Pet";
import Loading from "./common/Loading";
import scrollToTop from "./common/scrollToTop";
import { EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
// import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import "draft-js/dist/Draft.css";
import Editor from '@draft-js-plugins/editor';


const BlogAdd = (): JSX.Element => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ("00" + (today.getMonth() + 1)).slice(-2);
  const day = ("00" + today.getDate()).slice(-2);
  const hour = ("00" + today.getHours()).slice(-2);
  const minute = ("00" + today.getMinutes()).slice(-2);
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
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
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const history = useHistory();
  scrollToTop();
  const [fieldTypeId, setFieldTypeId]: [
    string,
    Dispatch<SetStateAction<any>> // HACK: 型定義見直す
  ] = useState<string>("");
  const imagePlugin = createImagePlugin();
  if (!cookies.authToken) history.push("/login");
  useEffect(() => {
    (async () => {
      const resultCareLogs = await getCareLogs(
        cookies.meId,
        cookies.selectedPet,
        "",
        cookies.authToken
      );
      if (resultCareLogs.length >= 400) history.push("/care/logs");
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
    //    notifySuccessSave();
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
  const boldText = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nextBoldState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    setEditorState(nextBoldState);
  };
  const italicText = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nextItalicState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
    setEditorState(nextItalicState);
  };
  const underlineText = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nextUnderLineState = RichUtils.toggleInlineStyle(
      editorState,
      "UNDERLINE"
    );
    setEditorState(nextUnderLineState);
  };
  const headerOneText = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nextHeaderOneState = RichUtils.toggleBlockType(
      editorState,
      "header-one"
    );
    setEditorState(nextHeaderOneState);
  };
  const headerTwoText = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nextHeaderTwoState = RichUtils.toggleBlockType(
      editorState,
      "header-two"
    );
    setEditorState(nextHeaderTwoState);
  };
  const headerThreeText = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nextHeaderThreeState = RichUtils.toggleBlockType(
      editorState,
      "header-three"
    );
    setEditorState(nextHeaderThreeState);
  };
  const headerFourText = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nextHeaderFourState = RichUtils.toggleBlockType(
      editorState,
      "header-four"
    );
    setEditorState(nextHeaderFourState);
  };
  const headerFiveText = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nextHeaderFiveState = RichUtils.toggleBlockType(
      editorState,
      "header-five"
    );
    setEditorState(nextHeaderFiveState);
  };
  const unorderedListItemText = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nextUnorderedListItemState = RichUtils.toggleBlockType(
      editorState,
      "unordered-list-item"
    );
    setEditorState(nextUnorderedListItemState);
  };
  const orderedListItemText = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nextOrderedListItemState = RichUtils.toggleBlockType(
      editorState,
      "ordered-list-item"
    );
    setEditorState(nextOrderedListItemState);
  };
  const handlePastedFiles = (e: React.ChangeEvent<HTMLInputElement>): any => {
    const formData = new FormData();
    // formData.append('file',files[0]) 
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0])
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e: any) => {
        setEditorState(insertImage(e.target.result))
      }
      reader.readAsDataURL(file)
    }
    // fetch('/api/uploads', 
    // {method: 'POST', body: formData})
    // .then(res => res.json())
    // .then(data => {
    //   if (data.file) { 
    //      setEditorState(insertImage(data.file)) //created below
    //   }
    // }).catch(err => {
    //     console.log(err) 
    // })
  }
  const insertImage = (url: string) => {
    console.log(url)
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
        'IMAGE',
        'IMMUTABLE',
        { src: url },)
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set( editorState,{ currentContent: contentStateWithEntity });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
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
          <Form
            aria-labelledby="label-3"
            necessityIndicator="icon"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 id="label-3">ブログ追加</h3>
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
              label="公開日"
              value={dateTime}
              onChange={setDateTime}
              isRequired={true}
            />
            <Picker
              label="ペットカテゴリーを選択してください"
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
            {/* <TextArea label="メモ" height="size-1600" onChange={setMemo} /> */}
            <div className="text-sm font-bold text-gray-400">本文</div>
            <div className="flex flex-wrap">
              <div
                className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded"
                onClick={boldText}
              >
                太字
              </div>
              <div
                className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded"
                onClick={italicText}
              >
                斜字
              </div>
              <div
                className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded"
                onClick={underlineText}
              >
                下線
              </div>
              <div
                className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded"
                onClick={headerOneText}
              >
                H1
              </div>
              <div
                className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded"
                onClick={headerTwoText}
              >
                H2
              </div>
              <div
                className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded"
                onClick={headerThreeText}
              >
                H3
              </div>
              <div
                className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded"
                onClick={headerFourText}
              >
                H4
              </div>
              <div
                className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded"
                onClick={headerFiveText}
              >
                H5
              </div>
              <div
                className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded"
                onClick={unorderedListItemText}
              >
                箇条書きリスト
              </div>
              <div
                className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded"
                onClick={orderedListItemText}
              >
                番号付きリスト
              </div>
              <input type="file" onChange={handlePastedFiles} />
              {/* <div className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded" onClick={underlineText}>下線</div> */}
              {/* <div className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded" onClick={underlineText}>下線</div> */}
              {/* <div className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded" onClick={underlineText}>下線</div> */}
              {/* <div className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded" onClick={underlineText}>下線</div> */}
            </div>
            <div className="border border-gray-600 bg-black text-base p-2 m-0 h-40 rounded">
              <Editor editorState={editorState} onChange={setEditorState} plugins={[imagePlugin]} />
            </div>
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

export default BlogAdd;
