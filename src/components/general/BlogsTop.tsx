import Header from "./Header";
import scrollToTop from "../common/scrollToTop";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { getBlogs } from "../../api/Blog";
import Footer from "./Footer";

const BlogsTop = (): JSX.Element => {
  const [blogs, setBlogs] = useState<any[]>([]);
  scrollToTop();
  useEffect(() => {
    let cleanedUp = false;
    (async () => {
      const resultBlogs = await getBlogs("", true, 99, 1);
      if (cleanedUp) return;
      setBlogs(resultBlogs);
    })();
    const cleanup = () => {
      cleanedUp = true;
    };
    return cleanup;
  }, []);
  return (
    <div className="container w-full pt-20">
      <Header />
      <div className="w-full font-bold text-2xl px-2 pb-2">新着記事</div>
      {blogs.map((blog, index) => (
        <div className="pb-8" key={index}>
          <RouterLink className="w-full" to={`/blog/${blog.id}`}>
            {(() => {
              if (blog.image)
                return (
                  <img
                    className="w-full object-cover h-56"
                    src={blog.image}
                    alt="ブログ画像"
                  ></img>
                );
            })()}
            <div className="w-full font-bold text-xl px-2">{blog.title}</div>
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
                    {year}年{month}月{day}日 {hour}:{minute}
                  </div>
                );
              })()}
              <div className="w-full text-sm">{blog.update_user}</div>
            </div>
          </RouterLink>
          <hr className="border-1 border-gray-300 mt-8 mb-6" />
        </div>
      ))}
      {/* <div className="px-2 pb-8">
        <div className="w-full font-bold text-2xl pb-2">カテゴリー</div>
        <div className="pr-2 flex flex-wrap">
          <RouterLink
            to="/category/dog"
            className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap"
          >
            犬
          </RouterLink>
          <RouterLink
            to="/category/dog"
            className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap"
          >
            猫
          </RouterLink>
          <RouterLink
            to="/category/dog"
            className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap"
          >
            カワウソ
          </RouterLink>
          <RouterLink
            to="/category/dog"
            className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap"
          >
            熱帯魚
          </RouterLink>
          <RouterLink
            to="/category/dog"
            className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap"
          >
            ワニ
          </RouterLink>
          <RouterLink
            to="/category/dog"
            className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap"
          >
            豚
          </RouterLink>
          <RouterLink
            to="/category/dog"
            className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap"
          >
            牛
          </RouterLink>
          <RouterLink
            to="/category/dog"
            className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap"
          >
            馬
          </RouterLink>
          <RouterLink
            to="/category/dog"
            className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap"
          >
            虫
          </RouterLink>
          <RouterLink
            to="/category/dog"
            className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap"
          >
            メガネザル
          </RouterLink>
          <RouterLink
            to="/category/dog"
            className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap"
          >
            海水魚
          </RouterLink>
          <RouterLink
            to="/category/dog"
            className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap"
          >
            深海魚
          </RouterLink>
        </div>
      </div> */}
      <Footer />
    </div>
  );
};

export default BlogsTop;
