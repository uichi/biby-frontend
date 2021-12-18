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

export const loginError = (): string =>
  toast.error("ログインできませんでした", {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 3000,
  });

export const notMatchPassword = (): string =>
  toast.error("パスワードが一致しません", {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 3000,
  });

export const notifySuccessSignup = (): string =>
  toast.error("仮登録しました。\nメールを確認してください。", {
    icon: "👏",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 10000,
  });

export const signupError = (): string =>
  toast.error("サインアップできませんでした", {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 3000,
  });

export const notifyEssentialValueIsEmpty = (): string =>
  toast.error("必須の値を入力してください", {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 3000,
  });

export const notifySendResetPasswordConfirm = (): string =>
  toast.error(
    "パスワードリセットを送信しました。\nメールを確認してください。",
    {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      duration: 10000,
    }
  );

export const notifySuccessSavePassword = (): string =>
  toast.error(
    "パスワードを再設定しました。\nログイン画面からログインしてください",
    {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      duration: 10000,
    }
  );

export const notifyErrorSending = (): string =>
  toast.error("送信に失敗しました", {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 3000,
  });

export const notifyNotExistShareId = (): string =>
  toast.error("送信した共有IDは存在しません", {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 3000,
  });

export const notifyRegisteredShareId = (): string =>
  toast.error("すでに登録しているペットIDです", {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 3000,
  });

export const notifyNeedAgreeTermsOfUse = (): string =>
  toast.error("ご利用には利用規約に同意する必要があります", {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 3000,
  });

export const notifyErrorDeleteUser = (): string =>
  toast.error("退会に失敗しました", {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 3000,
  });
