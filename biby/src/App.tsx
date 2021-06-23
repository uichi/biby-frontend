import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Top from "./components/Top";
import Pet from "./components/Pet";
import PetEdit from "./components/PetEdit";
import SettingApp from "./components/SettingApp";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/pet/edit/:id" component={PetEdit} />
        <Route exact path="/pet" component={Pet} />
        <Route exact path="/settings" component={SettingApp} />
        <Route exact path="/" component={Top} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
