
import './App.css';
import Header from './Header';
import Home from "./Home";
import Login from "./Login"
import CreateAccount from "./CreateAccount"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    // BEM
    <div className="app">
      <Router>
      <Switch>
        <Route path="/login">
          <Login />
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