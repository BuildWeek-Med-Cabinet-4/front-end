import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/signup">
          <SignUpForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
      </div>
    </Router>
  );
}

export default App;
