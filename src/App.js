import './App.css';
import Header from './Header';
import Home from "./Home";
import Login from "./Login"
import CreateAccount from "./CreateAccount"
import ItemDetail from "./ItemDetail"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Wishlist from './Wishlist';
import EditProfile from './EditProfile';
import Profile from './Profile'
import ItemUpload from './ItemUpload'
import SearchResult from './SearchResult'
import DirectChatPage from './DirectChatPage'
import { ChatEngine } from 'react-chat-engine';
import { useState } from 'react';

function App() {

  const [result, setResult] = useState('r')
  return (
    // BEM
    <div className="app">
      <Router>
      <Switch>

        <Route path="/ItemDetail/:title/:price/:rating">
          <Header setResult={setResult}/>
          <ItemDetail/>
        </Route>

        <Route path="/Login">
          <Login/>
        </Route>

        <Route path="/SearchResult">
          <Header setResult={setResult}/>
          <SearchResult result={result}/>
        </Route>

        <Route path="/EditProfile">
          <Header setResult={setResult}/>
          <EditProfile/>
        </Route>

        <Route path="/ItemUpload">
          <Header setResult={setResult}/>
          <ItemUpload/>
        </Route>

        <Route path="/Profile">
          <Header setResult={setResult}/>
          <Profile/>
        </Route>

        <Route path="/wishlist">
          <Header setResult={setResult}/>
          <Wishlist/>
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/CreateAccount">
          <CreateAccount/>
        </Route>

        <Route path="/DirectChatPage">
          <DirectChatPage/>
        </Route>

        <Route path="/">
          <Header setResult={setResult}/>
          <Home/>
        </Route>

      </Switch>
    </Router>
    </div>
  );
}

export default App;