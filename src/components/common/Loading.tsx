import { View, ProgressCircle } from "@adobe/react-spectrum";

const Loading = (): JSX.Element => {
  return (
    <View
      backgroundColor="gray-300"
      gridArea="content"
      width="100vw"
      height="100vh"
      position="fixed"
      zIndex={2}
    >
      <ProgressCircle
        aria-label="Loading…"
        value={50}
        position="fixed"
        top="46%"
        start="46%"
        isIndeterminate
      />
    </View>
  );
};

export default Loading;
