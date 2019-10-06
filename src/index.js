import React from 'react';
import ReactDOM from "react-dom";
import './index.sass';
import Tabs from './components/Tabs';
import Signup from './components/Signup';
import Login from './components/Login';


function App() {
  return (
    <div className="outer-container">
      <Tabs>
        <div label="Sign In">
          <Signup></Signup>
        </div>
        <div label="Log In">
          <Login></Login>
        </div>
      </Tabs>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
