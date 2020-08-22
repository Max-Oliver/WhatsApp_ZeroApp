import React, { useState } from "react";
import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import Chat from "./chat/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login/login";
import { useStateValue } from "./stateProvider/stateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    // BEM Naming convention
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Switch>
              <Route path="/rooms/:roomId">
                <Sidebar />
                <Chat />
              </Route>
              <Route path="/">
                <Sidebar />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
