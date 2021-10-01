import { useState, useEffect } from "react";
import Header from "./Header";
import scrollToTop from "../common/scrollToTop";
import { useCookies } from "react-cookie";
import {
  getBlogs,
  getBlog,
  getLikeBlog,
  postLikeBlog,
  deleteLikeBlog,
} from "../../api/Blog";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const Blog = (): JSX.Element => {
  const [blogId, setBlogId] = useState<string>("");
  const [title, setTitle] = useState<string | null>(null);
  const [petName, setPetName] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<any>(null);
  const [publishDateTime, setPublishDateTime] = useState<string>();
  const [content, setContent] = useState<string>("");
  const [donateLink, setDonateLink] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [likeBlogId, setLikeBlogId] = useState<string | null>(null);
  const [pageUrl, setPageUrl] = useState<string>("");
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  scrollToTop();
  useEffect(() => {
    let cleanedUp = false;
    (async () => {
      const selectedBlogId = location.pathname.split("/").slice(-1)[0];
      const resultBlog = await getBlog(selectedBlogId);
      if (!resultBlog) return;
      let resultLikeBlog = null;
      if (cookies.authToken) {
        resultLikeBlog = await getLikeBlog(
          selectedBlogId,
          cookies.meId,
          cookies.authToken
        );
      }
      const resultBlogs = await getBlogs(resultBlog.pet.id, 5, 0, true);
      const dateTime = new Date(
        resultBlog.publish_date_time ? resultBlog.publish_date_time : ""
      );
      const year = dateTime.getFullYear();
      const month = ("00" + (dateTime.getMonth() + 1)).slice(-2);
      const day = ("00" + dateTime.getDate()).slice(-2);
      const hour = ("00" + dateTime.getHours()).slice(-2);
      const minute = ("00" + dateTime.getMinutes()).slice(-2);
      if (cleanedUp) return;
      if (resultLikeBlog && resultLikeBlog[0])
        setLikeBlogId(resultLikeBlog[0].id);
      setBlogs(resultBlogs);
      setPublishDateTime(`${year}年${month}月${day}日 ${hour}:${minute}`);
      setBlogId(resultBlog.id);
      setTitle(resultBlog.title);
      setPetName(resultBlog.pet.name);
      setImageUri(resultBlog.image);
      setContent(resultBlog.content);
      setDonateLink(resultBlog.pet.donate_link);
      setPageUrl(window.location.href);
    })();
    const cleanup = () => {
      cleanedUp = true;
    };
    return cleanup;
  }, []);
  const handleLikeBlog = async () => {
    if (!cookies.authToken) {
      alert("いいねをするには、ログインしてください。");
      return;
    }
    if (likeBlogId) {
      const resultDeleteBlog = await deleteLikeBlog(
        likeBlogId,
        cookies.authToken
      );
      if (!resultDeleteBlog) setLikeBlogId(resultDeleteBlog);
    } else {
      const resultPostLikeBlog = await postLikeBlog(
        blogId,
        cookies.meId,
        cookies.authToken
      );
      if (resultPostLikeBlog) setLikeBlogId(resultPostLikeBlog.id);
    }
  };
  return (
    <>
      <Helmet>
        <title>{title}</title>
        {/* <!-- meta tags --> */}
        <meta name="description" content="ペットとの思い出を投稿できるbibyブログ" />
        {/* <!-- OG tags--> */}
        <meta property="og:title" content={title ? title : "bibyブログ"} />
        <meta property="og:site_name" content={title ? title : "bibyブログ"} />
        <meta
          property="og:description"
          content="ペットとの思い出を投稿できるbibyブログ"
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUri} />
        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemProp="name" content={title ? title : "bibyブログ"} />
        <meta
          itemProp="description"
          content="ペットとの思い出を投稿できるbibyブログ"
        />
        <meta itemProp="image" content={imageUri} />
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={imageUri} />
        <meta property="og:title" content={title ? title : "bibyブログ"} />
        <meta
          property="og:description"
          content="ペットとの思い出を投稿できるbibyブログ"
        />
        <meta property="og:image" content={imageUri} />
        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:title" content={title ? title : "bibyブログ"} />
        <meta
          name="twitter:description"
          content="ペットとの思い出を投稿できるbibyブログ"
        />
        <meta name="twitter:image" content={imageUri} />
      </Helmet>
      <Header />
      <div className="container w-full lg:w-1/3 pt-20 lg:mx-auto">
        <div className="w-full font-bold text-2xl px-1 pb-2">{title}</div>
        <img
          className="w-full object-cover h-56"
          src={imageUri}
          alt="ブログ画像"
        ></img>
        <div className="px-2 py-1">
          <div className="w-full text-sm">{publishDateTime}</div>
          <div className="w-full text-sm">{petName}</div>
        </div>
        <div className="px-2 pt-4 pb-10 text-base tracking-wide leading-7">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        {/* <div className="px-2 pb-2 text-2lx font-bold">コメント</div>
        <div className="px-2 pb-4 divide-y">
          <div className="w-full py-2">Hello World!</div>
          <div className="w-full py-2">Hello World!</div>
          <div className="w-full py-2">Hello World!</div>
        </div>
        <form className="px-2 pb-8">
          <textarea className="w-full p-2 border border-gray-400 rounded"></textarea>
          <button className="w-full bg-green-500 hover:bg-green-700 text-white hover:text-white py-1 px-2 rounded">
            投稿
          </button>
        </form> */}
        {(() => {
          if (donateLink)
            return (
              <div className="w-full text-center pb-6 my-2">
                <a
                  className="bg-pink-500 border-double border-4 border-light-pink-500 text-lg text-white font-bold p-3 rounded"
                  href={"https://www.paypal.com/paypalme/" + donateLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {petName}ちゃんを応援する！！
                </a>
              </div>
            );
        })()}
        {(() => {
          if (blogs.length > 1)
            return (
              <div className="pt-8 px-2 pb-1 text-2lx font-bold">
                このペットの他の記事を見る
              </div>
            );
        })()}
        {blogs.map((blog, index) => {
          if (blogId === blog.id) return;
          return (
            <div key={index}>
              <a className="w-full" href={`/blog/${blog.id}`}>
                {(() => {
                  if (blog.image)
                    return (
                      <img
                        className="w-full object-cover h-56 pb-2"
                        src={blog.image}
                        alt="ブログ画像"
                      />
                    );
                })()}
                <div className="w-full font-bold text-xl px-2">
                  {blog.title}
                </div>
                <div className="px-2">
                  {(() => {
                    const dateTime = new Date(blog.publish_date_time);
                    const year = dateTime.getFullYear();
                    const month = ("00" + (dateTime.getMonth() + 1)).slice(-2);
                    const day = ("00" + dateTime.getDate()).slice(-2);
                    const hour = ("00" + dateTime.getHours()).slice(-2);
                    const minute = ("00" + dateTime.getMinutes()).slice(-2);
                    return (
                      <div className="w-full text-sm">
                        {year}年{month}月{day}日 {hour}時{minute}分
                      </div>
                    );
                  })()}
                  <div className="w-full text-sm">{blog.pet.name}</div>
                </div>
              </a>
              <hr className="border-1 border-gray-300 mt-8 mb-6" />
            </div>
          );
        })}
        <button
          className={
            `${likeBlogId ? "bg-pink-500 " : "bg-white "}` +
            `${"border-2 border-pink-500 font-bold fixed z-10 rounded-full h-14 w-14 bottom-2 right-2 flex items-center justify-center"}`
          }
          onClick={handleLikeBlog}
        >
          <svg
            className={
              likeBlogId ? "h-8 w-8 text-white" : "h-8 w-8 text-pink-500"
            }
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
          </svg>
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
