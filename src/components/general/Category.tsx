import Header from "./Header";
import scrollToTop from "../common/scrollToTop";
import { Link as RouterLink } from "react-router-dom";
import Footer from "./Footer";

const BlogsTop = (): JSX.Element => {
  scrollToTop();
  return (
    <div className="container w-full pt-20">
      <Header />
      <div className="w-full font-bold text-2xl px-1 pb-2">
        犬(カテゴリー名入れる)
      </div>
      <div className="pb-8">
        <RouterLink className="w-full" to="/blog/2">
          <img
            className="w-full"
            src="https://source.unsplash.com/random/1600x900/"
            alt="Sunset in the mountains"
          ></img>
          <div className="w-full font-bold text-xl px-2">
            タイトルタイトルタイトル
          </div>
          <div className="px-2">
            <div className="w-full text-sm">2021年9月23日</div>
            <div className="w-full text-sm">uichi</div>
          </div>
        </RouterLink>
      </div>
      <div className="pb-8">
        <RouterLink className="w-full" to="/blog/2">
          <img
            className="w-full"
            src="https://source.unsplash.com/random/1600x900/"
            alt="Sunset in the mountains"
          ></img>
          <div className="w-full font-bold text-xl px-2">
            タイトルタイトルタイトル2
          </div>
          <div className="px-2">
            <div className="w-full text-sm">2021年9月23日</div>
            <div className="w-full text-sm">uichi</div>
          </div>
        </RouterLink>
      </div>
      <Footer />
    </div>
  );
};

export default BlogsTop;
