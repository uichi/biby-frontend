import {
  Provider,
  defaultTheme,
  View,
  Image,
  Form,
  TextField,
  RadioGroup,
  Radio,
  DialogTrigger,
  ActionButton,
  AlertDialog,
} from "@adobe/react-spectrum";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { getPet, patchPet } from "../api/Pet";
import ImageUploading, { ImageListType } from "react-images-uploading";
import {
  notifyErrorSave,
  notifySuccessSave,
  notifyEssentialValueIsEmpty,
} from "./common/toast";
import { Toaster } from "react-hot-toast";

const PetEdit = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const [name, setName] = useState<string>("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [petId, setPetId] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [welcomeDay, setWelcomeDay] = useState<string>("");
  const [shareId, setShareId] = useState<string>("");
  const [isHeaven, setIsHeaven] = useState<boolean>(false);
  const history = useHistory();
  const maxNumber = 1;

  if (!cookies.authToken) history.push("/login");
  useEffect(() => {
    (async () => {
      const selectedPetId = location.pathname.split("/").slice(-1)[0];
      setPetId(selectedPetId);
      const pet = await getPet(selectedPetId, cookies.authToken);
      if (pet) {
        setName(pet.name);
        setImageUrl(pet.image);
        // NOTE: undefinedになる可能性があるstateはsetしないように制御
        if (pet.gender) setGender(pet.gender.toString());
        if (pet.birthday) setBirthday(pet.birthday);
        if (pet.welcome_day) setWelcomeDay(pet.welcome_day);
        setShareId(pet.share_id);
        setIsHeaven(pet.is_heaven === "true");
      }
    })();
  }, []);
  const updatePet = async () => {
    if (name === "") {
      notifyEssentialValueIsEmpty();
      return;
    }
    const resultPatchPet = await patchPet(
      petId,
      name,
      gender,
      birthday,
      welcomeDay,
      image,
      cookies.authToken
    );
    if (!resultPatchPet) {
      notifyErrorSave();
      return;
    }
    notifySuccessSave();
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
                {(() => {
                  if (!image)
                    return (
                      <Image
                        width="100px"
                        height="100px"
                        src={imageUrl}
                        alt={name}
                        objectFit="cover"
                      />
                    );
                })()}
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
              value={name}
              isRequired={true}
              onChange={setName}
            />
            <TextField
              type="date"
              label="誕生日"
              value={birthday}
              placeholder="2020年7月1日"
              onChange={setBirthday}
            />
            <TextField
              type="date"
              label="家族になった日"
              value={welcomeDay}
              placeholder="2020年7月1日"
              onChange={setWelcomeDay}
            />
            <RadioGroup value={gender} onChange={setGender} label="性別">
              <Radio value="male">オス</Radio>
              <Radio value="female">メス</Radio>
            </RadioGroup>
            <ActionButton staticColor="white" onPress={updatePet}>
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

export default PetEdit;
