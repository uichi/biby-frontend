import toast from "react-hot-toast";

export const notifySuccessSave = (): string =>
  toast.success(
    // TODO: トーストに閉じるボタンを付けたい
    //     (t) => (
    //       <span>
    //         保存しました
    //         <button onClick={() => toast.dismiss(t.id)}>✖︎</button>
    //       </span>
    //     ),
    "保存しました",
    {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      duration: 3000,
    }
  );

export const notifyErrorSave = (): string =>
  toast.error("保存できませんでした", {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 3000,
  });

export const notifyErrorGet = (): string =>
  toast.error("データを取得できませんでした", {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 3000,
  });

export const validateNotEnteredError = (): string =>
  toast.error("未入力の値があります", {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 3000,
  });

export const validateEmailError = (): string =>
  toast.error("メールアドレスを正しく入力してください", {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 3000,
  });
