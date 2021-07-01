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
  Checkbox,
} from "@adobe/react-spectrum";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const CareLogEdit = (): JSX.Element => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <Provider theme={defaultTheme} colorScheme="dark">
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
              label="テキスト"
              placeholder="テキスト"
              isRequired={true}
            />
            <NumberField
              label="整数"
              defaultValue={4}
              minValue={0}
              formatOptions={{
                style: "unit",
                unit: "minute",
                unitDisplay: "long",
              }}
            />
            <NumberField
              label="小数"
              defaultValue={4}
              minValue={0}
              formatOptions={{
                style: "unit",
                unit: "inch",
                unitDisplay: "long",
              }}
            />
            <Checkbox isSelected={selected} onChange={setSelected}>
              Subscribe (controlled)
            </Checkbox>
            <TextArea label="メモ" />
            <ActionButton type="submit" staticColor="white">
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

export default CareLogEdit;
