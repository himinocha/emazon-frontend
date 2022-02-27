import './App.css';
import Header from './Header';
import Home from "./Home";
import Login from "./Login"
import CreateAccount from "./CreateAccount"
import ItemDetail from "./ItemDetail"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    // BEM
    <div className="app">
      <Router>
      <Switch>
        <Route path="/ItemDetail/:title/:price/:rating">
          <Header/>
          <ItemDetail/>
        </Route>
        <Route path="/Login">
          <Login/>
        </Route>
        <Route path="/CreateAccount">
          <CreateAccount/>
        </Route>
        <Route path="/">
          <Header/>
          <Home/>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;