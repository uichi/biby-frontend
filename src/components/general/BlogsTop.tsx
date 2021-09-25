import Header from "./Header";
import scrollToTop from "../common/scrollToTop";
import { Link as RouterLink } from "react-router-dom";

const BlogsTop = (): JSX.Element => {
  scrollToTop();
  return (
    <div className="container w-full pt-20">
      <Header />
      <div className="w-full font-bold text-2xl px-1 pb-2">
        新着記事
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
      {/* <div className="pb-8">
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
      </div> */}
      <div className="px-2 pb-8">
        <div className="w-full font-bold text-2xl pb-2">
          カテゴリー
        </div>
        <div className="pr-2 flex flex-wrap">
          <RouterLink to='/' className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap">犬</RouterLink>
          <RouterLink to='/' className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap">猫</RouterLink>
          <RouterLink to='/' className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap">カワウソ</RouterLink>
          <RouterLink to='/' className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap">熱帯魚</RouterLink>
          <RouterLink to='/' className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap">ワニ</RouterLink>
          <RouterLink to='/' className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap">豚</RouterLink>
          <RouterLink to='/' className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap">牛</RouterLink>
          <RouterLink to='/' className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap">馬</RouterLink>
          <RouterLink to='/' className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap">虫</RouterLink>
          <RouterLink to='/' className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap">メガネザル</RouterLink>
          <RouterLink to='/' className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap">海水魚</RouterLink>
          <RouterLink to='/' className="bg-gray-200 border-1 font-bold rounded px-5 py-3 mr-1 mb-2 whitespace-nowrap">深海魚</RouterLink>
        </div>
      </div>
    </div>
  )
};

export default BlogsTop;
