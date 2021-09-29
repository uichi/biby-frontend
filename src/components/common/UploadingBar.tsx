import { ProgressBar } from "@adobe/react-spectrum";

const UploadingBar = (): JSX.Element => {
  return <ProgressBar size="S" label="画像アップロード中..." isIndeterminate />;
};

export default UploadingBar;
