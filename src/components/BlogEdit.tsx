import {
  Provider,
  defaultTheme,
  View,
  Form,
  TextField,
  ActionButton,
  Picker,
  Item,
  Checkbox,
} from "@adobe/react-spectrum";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Header from "./Header";
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  // notifySuccessSave,
  // notifyErrorSave,
  validateNotEnteredError,
} from "./common/toast";
import { postBlog, getBlog } from "../api/Blog";
import { getPets } from "../api/Pet";
import Loading from "./common/Loading";
import { EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
import createImagePlugin from "@draft-js-plugins/image";
import "draft-js/dist/Draft.css";
import Editor from "@draft-js-plugins/editor";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

const BlogEdit = (): JSX.Element => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ("00" + (today.getMonth() + 1)).slice(-2);
  const day = ("00" + today.getDate()).slice(-2);
  const hour = ("00" + today.getHours()).slice(-2);
  const minute = ("00" + today.getMinutes()).slice(-2);
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [pets, setPets] = useState<any[]>([]);
  const [petId, setPetId] = useState<number>();
  const [blogId, setBlogId] = useState<string>("");
  const [title, setTitle] = useState<string | null>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [image, setImage] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [publishDateTime, setPublishDateTime] = useState<string>(
    `${year}-${month}-${day}T${hour}:${minute}`
  );
  const history = useHistory();
  const imagePlugin = createImagePlugin();
  if (!cookies.authToken) history.push("/login");
  useEffect(() => {
    (async () => {
      const selectedBlogId = location.pathname.split("/").slice(-1)[0];
      setBlogId(selectedBlogId);
      const resultBlog = await getBlog(selectedBlogId, cookies.authToken);
      if (!resultBlog) return;
      const today = resultBlog.publish_date_time
        ? new Date(resultBlog.publish_date_time)
        : new Date();
      const year = today.getFullYear();
      const month = ("00" + (today.getMonth() + 1)).slice(-2);
      const day = ("00" + today.getDate()).slice(-2);
      const hour = ("00" + today.getHours()).slice(-2);
      const minute = ("00" + today.getMinutes()).slice(-2);
      setPublishDateTime(`${year}-${month}-${day}T${hour}:${minute}`);
      setPetId(Number(resultBlog.pet.id));
      setTitle(resultBlog.title);
      setImage(resultBlog.image);
      const contentState = stateFromHTML(resultBlog.content);
      setEditorState(EditorState.createWithContent(contentState));
      setIsPublished(resultBlog.is_published);
      const resultGetPets = await getPets(cookies.meId, cookies.authToken);
      setPets(
        resultGetPets.map((value) => ({
          id: value.pet.id,
          name: value.pet.name,
        }))
      );
      setIsLoaded(false);
    })();
  }, []);
  const updateBlog = async () => {
    if (!petId) {
      validateNotEnteredError();
      return;
    }
    // const resultAddBlog = await postBlog(
    //   petId,
    //   title,
    //   stateToHTML(editorState.getCurrentContent()),
    //   image,
    //   isPublished,
    //   publishDateTime,
    //   cookies.meId,
    //   cookies.authToken
    // );
    history.push("/blogs");
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
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setEditorState(insertImage(e.target.result));
      };
      reader.readAsDataURL(file);
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
  };
  const insertImage = (url: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
  };
  const uploadImage = (e: any) => {
    setImage(e.target.files[0]);
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
        paddingBottom="8vh"
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
              label="タイトル"
              value={title ? title : ""}
              onChange={setTitle}
            />
            <TextField
              type="datetime-local"
              label="公開日時"
              value={publishDateTime}
              onChange={setPublishDateTime}
            />
            <div className="mb-1">
              <label className="text-sm font-bold text-gray-400">
                サムネイル
              </label>
              <input
                type="file"
                className="pt-1"
                src={image ? image : ""}
                onChange={uploadImage}
              />
            </div>
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
              <label className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded">
                <span className="">画像挿入</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handlePastedFiles}
                />
              </label>
              {/* <div className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded" onClick={underlineText}>下線</div> */}
              {/* <div className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded" onClick={underlineText}>下線</div> */}
              {/* <div className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded" onClick={underlineText}>下線</div> */}
              {/* <div className="border border-gray-300 p-1 mr-2 mb-2 whitespace-nowrap rounded" onClick={underlineText}>下線</div> */}
            </div>
            <div className="border border-gray-600 bg-black text-base p-2 mb-1 h-auto min-h-200 rounded">
              <Editor
                editorState={editorState}
                onChange={setEditorState}
                plugins={[imagePlugin]}
              />
            </div>
            <Checkbox isSelected={isPublished} onChange={setIsPublished}>
              公開する
            </Checkbox>
            <ActionButton staticColor="white" onPress={updateBlog}>
              保存
            </ActionButton>
          </Form>
        </View>
      </View>
      <Footer />
    </Provider>
  );
};

export default BlogEdit;
