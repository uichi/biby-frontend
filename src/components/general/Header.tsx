import scrollToTop from "../common/scrollToTop";
import { Link as RouterLink } from "react-router-dom";

const Header = (): JSX.Element => {
  scrollToTop();
  return (
    <div className="w-full flex bg-white fixed w-full z-10 top-0 shadow">
      <div className="w-1/2 py-3">
        <RouterLink
          className="text-gray-900 text-xl no-underline hover:no-underline font-bold px-3"
          to="/"
        >
          bibyブログ
        </RouterLink>
      </div>
      <div className="w-1/2 p-3 pull-right">
        <RouterLink
          to="/login"
          className="bg-green-500 hover:bg-green-700 text-white hover:text-white py-1 px-2 rounded float-right"
        >
          ログイン
        </RouterLink>
      </div>
    </div>
  );
};

export default Header;
