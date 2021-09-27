import { blogsUrl, likeBlogUrl, blogCommentUrl } from "./Config";
import { EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
import { Blog } from "../types";

export const postBlog = (
  petId: number,
  title: string | null,
  content: string | null,
  image: File | null,
  isPublished: boolean,
  publishDateTime: string | null,
  meId: string,
  token: string
): Promise<any> | null => {
  const formData = new FormData();
  formData.append("pet", petId.toString());
  if (title) formData.append("title", title);
  if (content) formData.append("content", content);
  if (image) formData.append("image", image);
  formData.append("is_published", isPublished.toString());
  if (publishDateTime) formData.append("publish_date_time", publishDateTime);
  formData.append("create_user", meId);
  const options = {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  };
  return fetch(blogsUrl, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};