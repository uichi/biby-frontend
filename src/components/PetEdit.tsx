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
import { useHistory, Redirect } from "react-router-dom";
import { getPet, patchPet, deletePet } from "../api/Pet";
import ImageUploading, { ImageListType } from "react-images-uploading";
import {
  notifyErrorSave,
  notifySuccessSave,
  notifyEssentialValueIsEmpty,
} from "./common/toast";
import { Toaster } from "react-hot-toast";
import Loading from "./common/Loading";

const PetEdit = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  if (!cookies.authToken) return <Redirect to="/login" />;
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [petId, setPetId] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [welcomeDay, setWelcomeDay] = useState<string>("");
  const [donateLink, setDonateLink] = useState<string>("");
  //  const [isHeaven, setIsHeaven] = useState<boolean>(false);
  const history = useHistory();
  const maxNumber = 1;

  useEffect(() => {
    let cleanedUp = false;
    (async () => {
      const selectedPetId = location.pathname.split("/").slice(-1)[0];
      setPetId(selectedPetId);
      const pet = await getPet(selectedPetId, cookies.authToken);
      if (pet) {
        if (cleanedUp) return;
        setName(pet.name);
        setImageUrl(pet.image);
        // NOTE: undefinedになる可能性があるstateはsetしないように制御
        if (pet.gender) setGender(pet.gender.toString());
        if (pet.birthday) setBirthday(pet.birthday);
        if (pet.welcome_day) setWelcomeDay(pet.welcome_day);
        if (pet.donate_link) setDonateLink(pet.donate_link);
        //        setIsHeaven(pet.is_heaven === "true");
        setIsLoaded(false);
      }
    })();
    const cleanup = () => {
      cleanedUp = true;
    };
    return cleanup;
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
      donateLink,
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
  const removePet = async () => {
    await deletePet(petId, cookies.authToken);
    history.push("/pets");
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
        <View marginStart="size-100">
          <h3>ペット編集</h3>
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
            <TextField
              label="PayPal.Me (アカウント名を入力してください)"
              placeholder="ex) biby"
              value={donateLink}
              onChange={setDonateLink}
            />
            <ActionButton staticColor="white" onPress={updatePet}>
              保存
            </ActionButton>
            <DialogTrigger>
              <ActionButton>削除</ActionButton>
              <AlertDialog
                variant="destructive"
                title="削除しますか？"
                primaryActionLabel="削除"
                onPrimaryAction={removePet}
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
