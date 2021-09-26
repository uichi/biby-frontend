import Header from "./Header";
import scrollToTop from "../common/scrollToTop";
import { Link as RouterLink } from "react-router-dom";

const Blog = (): JSX.Element => {
  scrollToTop();
  return (
    <div className="container w-full pt-20">
      <Header />
      <div className="w-full font-bold text-2xl px-1 pb-2">
        タイトルタイトルタイトル
      </div>
      <img
        className="w-full"
        src="https://source.unsplash.com/random/1600x900/"
        alt="Sunset in the mountains"
      ></img>
      <div className="px-2 py-1">
        <div className="w-full text-sm">2021年9月23日</div>
        <div className="w-full text-sm">uichi</div>
      </div>
      <div className="px-2 pt-4 pb-10 text-base tracking-wide leading-7">
        恥の多い生涯を送って来ました。自分には、人間の生活というものが、見当つかないのです。自分は東北の田舎に生れましたので、汽車をはじめて見たのは、よほど大きくなってからでした。自分は停車場のブリッジを、上って、降りて、そうしてそれが線路をまたぎ越えるために造られたものだという事には全然気づかず、ただそれは停車場の構内を外国の遊戯場みたいに、複雑に楽しく、ハイカラにするためにのみ、設備せられてあるものだとばかり思っていました。しかも、かなり永い間そう思っていたのです。ブリッジの上ったり降りたりは、自分にはむしろ、ずいぶん垢抜けのした遊戯で、それは鉄道のサーヴィスの中でも、最も気のきいたサーヴィスの一つだと思っていたのですが、のちにそれはただ旅客が線路をまたぎ越えるための頗る実利的な階段に過ぎないのを発見して、にわかに興が覚めました。また、自分は子供の頃、絵本で地下鉄道というものを見て、これもやは
      </div>
      <button className="bg-white border-2 border-pink-500 text-white font-bold fixed z-10 rounded-full h-14 w-14 bottom-2 right-2 flex items-center justify-center">
        <svg className="h-8 w-8 text-pink-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
        </svg>
      </button>
      <div className="px-2 pb-2 text-2lx font-bold">
        コメント
      </div>
      <div className="px-2 pb-4 divide-y">
        <div className="w-full py-2">
          Hello World!
        </div>
        <div className="w-full py-2">
          Hello World!
        </div>
        <div className="w-full py-2">
          Hello World!
        </div>
      </div>
      <form className="px-2 pb-8">
        <textarea className="w-full p-2 border border-gray-400 rounded"></textarea>
        <button className="w-full bg-green-500 hover:bg-green-700 text-white hover:text-white py-1 px-2 rounded">投稿</button>
      </form>
      <div className="px-2 pb-1 text-2lx font-bold">
        このペットの他の記事を見る
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
            タイトルタイトルタイトル
          </div>
          <div className="px-2">
            <div className="w-full text-sm">2021年9月23日</div>
            <div className="w-full text-sm">uichi</div>
          </div>
        </RouterLink>
      </div>
    </div>
  );
};

export default Blog;
