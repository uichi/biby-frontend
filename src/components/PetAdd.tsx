import {
  Provider,
  defaultTheme,
  View,
  Form,
  TextField,
  RadioGroup,
  Radio,
  ActionButton,
  Dialog,
  DialogTrigger,
  Divider,
  Heading,
  Flex,
  Text,
  Button,
  ButtonGroup,
  Content,
} from "@adobe/react-spectrum";
import Header from "./Header";
import Footer from "./Footer";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { postPet, getPetRelatedShareId } from "../api/Pet";
import { postPetOwnerGroup } from "../api/PetOwnerGroup";
import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { validateNotEnteredError, notifyErrorSave } from "./common/toast";
import { Toaster } from "react-hot-toast";
import scrollToTop from "./common/scrollToTop";

const PetEdit = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [images, setImages] = useState([]);
  const [image, setImage] = useState<File>();
  const [shareId, setShareId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [welcomeDay, setWelcomeDay] = useState<string>("");
  const history = useHistory();
  const maxNumber = 1;
  scrollToTop();

  if (!cookies.authToken) history.push("/login");
  const addPetOwnerGroup = async (close: any) => {
    const resultGetPet = await getPetRelatedShareId(shareId, cookies.authToken);
    if (resultGetPet) {
      const resultPostPetOwnerGroup = await postPetOwnerGroup(
        cookies.meId,
        resultGetPet.id,
        cookies.authToken
      );
    }
    history.push("/pets");
  };
  const addPet = async () => {
    if (name === "") {
      validateNotEnteredError();
      return;
    }
    const addPetResult = await postPet(
      name,
      gender,
      birthday,
      welcomeDay,
      image,
      cookies.authToken
    );
    if (!addPetResult) {
      notifyErrorSave();
      return;
    }
    history.push("/pets");
  };

  const uploadImage = (imageList: ImageListType) => {
    setImages(imageList as never[]);
    if (imageList[0]) setImage(imageList[0].file);
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
        <View marginStart="size-100">
          <Flex justifyContent="space-between">
            <Heading level={3}>ペット追加</Heading>
            <DialogTrigger>
              <ActionButton marginTop="size-150" marginEnd="size-100">
                共有IDをお持ちの方
              </ActionButton>
              {(close) => (
                <Dialog>
                  <Heading>
                    <Flex alignItems="center" gap="size-100">
                      <Text>共有ID登録</Text>
                    </Flex>
                  </Heading>
                  <Divider />
                  <Content>
                    <Form>
                      <TextField
                        label="共有ID"
                        value={shareId}
                        onChange={setShareId}
                      />
                    </Form>
                  </Content>
                  <ButtonGroup>
                    <Button variant="secondary" onPress={close}>
                      キャンセル
                    </Button>
                    <Button
                      variant="cta"
                      onPress={() => addPetOwnerGroup(close)}
                    >
                      登録
                    </Button>
                  </ButtonGroup>
                </Dialog>
              )}
            </DialogTrigger>
          </Flex>
        </View>
        <View margin="size-100">
          <ImageUploading
            multiple
            value={images}
            onChange={uploadImage}
            maxNumber={maxNumber}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              isDragging,
              dragProps,
            }) => (
              <div className="upload__image-wrapper">
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.dataURL} alt="" width="100" />
                  </div>
                ))}
                <button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={() => {
                    onImageRemoveAll();
                    onImageUpload();
                  }}
                  {...dragProps}
                >
                  画像選択
                </button>
                &nbsp;
                <button onClick={onImageRemoveAll}>削除</button>
              </div>
            )}
          </ImageUploading>
          <Form aria-labelledby="label-3" necessityIndicator="icon">
            <TextField
              label="名前"
              placeholder="ぽち"
              isRequired={true}
              value={name}
              onChange={setName}
            />
            <TextField
              type="date"
              label="誕生日"
              value={birthday}
              onChange={setBirthday}
            />
            <TextField
              type="date"
              label="家族になった日"
              value={welcomeDay}
              onChange={setWelcomeDay}
            />
            <RadioGroup value={gender} onChange={setGender} label="性別">
              <Radio value="male">オス</Radio>
              <Radio value="female">メス</Radio>
            </RadioGroup>
            <ActionButton staticColor="white" onPress={addPet}>
              保存
            </ActionButton>
          </Form>
        </View>
      </View>
      <Footer />
    </Provider>
  );
};

export default PetEdit;
