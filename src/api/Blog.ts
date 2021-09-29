import { blogsUrl, likeBlogUrl, blogCommentUrl } from "./Config";
import { Blog } from "../types";

export const getBlog = (
  blogId: string,
  token: string
): Promise<Blog> | null => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(blogsUrl + `${blogId}/`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const getBlogs = (
  petId: string,
  token: string
): Promise<{ pet: Blog }[]> | [] => {
  const query_params = new URLSearchParams({
    pet: petId,
  });
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(blogsUrl + `?${query_params}`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json.results)
    .catch(() => []);
};

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
  formData.append("pet_pk", petId.toString());
  if (title) formData.append("title", title);
  if (content) formData.append("content", content);
  if (image) formData.append("image", image);
  formData.append("is_published", isPublished.toString());
  if (publishDateTime) formData.append("publish_date_time", publishDateTime);
  formData.append("create_user_pk", meId);
  console.log(formData);
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
