import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Top from "./components/Top";
import Pets from "./components/Pets";
import PetEdit from "./components/PetEdit";
import SettingApp from "./components/SettingApp";
import CareLogs from "./components/CareLogs";
import CareLogEdit from "./components/CareLogEdit";
import CareCategories from "./components/CareCategories";
import CareCategoryEdit from "./components/CareCategoryEdit";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/pet/edit/:id" component={PetEdit} />
        <Route exact path="/pets" component={Pets} />
        <Route exact path="/settings" component={SettingApp} />
        <Route exact path="/care/log/edit/:id" component={CareLogEdit} />
        <Route exact path="/care/logs" component={CareLogs} />
        <Route exact path="/care/categories" component={CareCategories} />
        <Route
          exact
          path="/care/category/edit/:id"
          component={CareCategoryEdit}
        />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/" component={Top} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
