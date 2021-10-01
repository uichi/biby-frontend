import { blogsUrl, likeBlogUrl } from "./Config";
import { Blog } from "../types";

export const getBlog = (blogId: string): Promise<Blog> | null => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
  limit?: number,
  offset?: number,
  isPublished: boolean | undefined = undefined
): Promise<{ pet: Blog }[]> | [] => {
  if (!petId) return [];
  const query_params = new URLSearchParams();
  query_params.append("pet", petId);
  if (typeof isPublished !== "undefined") {
    query_params.append("is_published", isPublished ? "true" : "false");
  }
  if (typeof limit !== "undefined" && typeof offset !== "undefined") {
    query_params.append("limit", limit.toString());
    query_params.append("offset", offset.toString());
  }
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

export const patchBlog = (
  id: string,
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
  formData.append("update_user_pk", meId);
  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  };
  return fetch(blogsUrl + `${id}/`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const deleteBlog = (id: string, token: string): Promise<Blog> | null => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(blogsUrl + `${id}/`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const getLikeBlog = (
  blogId: string,
  meId: string,
  token: string
): Promise<any> | null => {
  const query_params = new URLSearchParams({
    user: meId,
    blog: blogId,
  });
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(likeBlogUrl + `?${query_params}`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const postLikeBlog = (
  blogId: string,
  meId: string,
  token: string
): Promise<any> | null => {
  const body = JSON.stringify({
    user_pk: meId,
    blog_pk: blogId,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body,
  };
  return fetch(likeBlogUrl, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};

export const deleteLikeBlog = (
  id: string,
  token: string
): Promise<any> | null => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  return fetch(likeBlogUrl + `${id}/`, options)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((json) => json)
    .catch(() => null);
};
