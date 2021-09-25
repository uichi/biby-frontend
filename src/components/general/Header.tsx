import scrollToTop from "../common/scrollToTop";
import { Link as RouterLink } from "react-router-dom";

const Header = (): JSX.Element => {
  scrollToTop();
  return (
    <div className="bg-white fixed w-full z-10 top-0 shadow">
      <div className="w-full py-3">
        <RouterLink
          className="text-gray-900 text-xl no-underline hover:no-underline font-bold px-3"
          to="/"
        >
          biby
        </RouterLink>
      </div>
    </div>
  );
};

export default Header;
