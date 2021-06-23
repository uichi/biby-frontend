import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Top from "./components/Top";
import Pets from "./components/Pets";
import PetEdit from "./components/PetEdit";
import SettingApp from "./components/SettingApp";
import Records from "./components/Records";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/pet/edit/:id" component={PetEdit} />
        <Route exact path="/pets" component={Pets} />
        <Route exact path="/settings" component={SettingApp} />
        <Route exact path="/records" component={Records} />
        <Route exact path="/" component={Top} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
