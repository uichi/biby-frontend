import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./App.css";
import Top from "./components/Top";
import Pets from "./components/Pets";
import PetEdit from "./components/PetEdit";
import SettingApp from "./components/SettingApp";
import CareLogs from "./components/CareLogs";
import CareLogAdd from "./components/CareLogAdd";
import CareLogEdit from "./components/CareLogEdit";
import CareCategories from "./components/CareCategories";
import CareCategoryEdit from "./components/CareCategoryEdit";
import CareCategoryAdd from "./components/CareCategoryAdd";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PetAdd from "./components/PetAdd";
import PetSelect from "./components/PetSelect";
import ResetPassword from "./components/ResetPassword";
import ResetPasswordConfirm from "./components/ResetPasswordConfirm";
import Plan from "./components/Plan";
import Blogs from "./components/Blogs";
import BlogCreate from "./components/BlogCreate";
import BlogEdit from "./components/BlogEdit";
import GeneralBlogsTop from "./components/general/BlogsTop";
import GeneralBlog from "./components/general/Blog";
import GeneralCategory from "./components/general/Category";

function App(): JSX.Element {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/pet/edit/:id" component={PetEdit} />
          <Route exact path="/pets" component={Pets} />
          <Route exact path="/pet/add" component={PetAdd} />
          <Route exact path="/pet/select" component={PetSelect} />
          <Route exact path="/settings" component={SettingApp} />
          <Route exact path="/care/log/add" component={CareLogAdd} />
          <Route exact path="/care/log/edit/:id" component={CareLogEdit} />
          <Route exact path="/care/logs" component={CareLogs} />
          <Route exact path="/care/categories" component={CareCategories} />
          <Route exact path="/care/category/add" component={CareCategoryAdd} />
          <Route
            exact
            path="/care/category/edit/:id"
            component={CareCategoryEdit}
          />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/dashboard/top" component={Top} />
          <Route exact path="/reset_password" component={ResetPassword} />
          <Route
            exact
            path="/reset_password_confirm"
            component={ResetPasswordConfirm}
          />
          <Route exact path="/plan" component={Plan} />
          <Route exact path="/blogs" component={Blogs} />
          <Route exact path="/blog/create" component={BlogCreate} />
          <Route exact path="/blog/edit" component={BlogEdit} />
          <Route exact path="/blog/:id" component={GeneralBlog} />
          <Route exact path="/" component={GeneralBlogsTop} />
          <Route exact path="/category/:id" component={GeneralCategory} />
        </Switch>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
