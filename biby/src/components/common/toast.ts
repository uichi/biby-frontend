import toast from "react-hot-toast";

export const notify = (): string =>
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
